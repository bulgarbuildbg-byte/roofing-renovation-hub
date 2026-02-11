import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Eye, Upload, Bold, Italic, Link as LinkIcon, Image, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

const ArticleEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("general");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!id) return;
    supabase.from("articles").select("*").eq("id", id).single().then(({ data }) => {
      if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
        setExcerpt(data.excerpt || "");
        setCategory(data.category);
        setTags((data.tags || []).join(", "));
        setPublished(data.published);
        setCoverUrl(data.cover_image_url);
      }
      setLoading(false);
    });
  }, [id]);

  const generateSlug = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit || !slug) setSlug(generateSlug(val));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `covers/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("article-images").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("article-images").getPublicUrl(path);
      setCoverUrl(data.publicUrl);
    }
    setUploading(false);
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const newContent = content.substring(0, start) + prefix + selected + suffix + content.substring(end);
    setContent(newContent);
  };

  const insertLink = () => {
    const url = prompt("Въведете URL:");
    if (!url) return;
    const text = prompt("Текст на линка:", "линк") || "линк";
    insertMarkdown(`[${text}](${url})`);
  };

  const insertImage = () => {
    const url = prompt("Въведете URL на изображението:");
    if (!url) return;
    const alt = prompt("Алтернативен текст:", "изображение") || "изображение";
    insertMarkdown(`![${alt}](${url})`);
  };

  const handleSave = async () => {
    if (!title || !slug) {
      toast({ title: "Заглавието и slug са задължителни", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      published,
      cover_image_url: coverUrl,
      author_id: user!.id,
      published_at: published ? new Date().toISOString() : null,
    };

    if (isEdit) {
      const { error } = await supabase.from("articles").update(payload).eq("id", id);
      if (error) toast({ title: "Грешка при запазване", variant: "destructive" });
      else toast({ title: "Статията е обновена" });
    } else {
      const { error } = await supabase.from("articles").insert(payload);
      if (error) toast({ title: error.message, variant: "destructive" });
      else {
        toast({ title: "Статията е създадена" });
        navigate("/admin/articles");
      }
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/articles")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          {isEdit ? "Редакция на статия" : "Нова статия"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div>
              <Label>Заглавие</Label>
              <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Заглавие на статията" />
            </div>
            <div>
              <Label>Slug (URL)</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="url-на-статията" />
              <p className="text-xs text-muted-foreground mt-1">/блог/{slug}</p>
            </div>
            <div>
              <Label>Кратко описание</Label>
              <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} placeholder="SEO описание..." />
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-3">
              <Label>Съдържание (Markdown)</Label>
              <Button variant="outline" size="sm" onClick={() => setPreview(!preview)}>
                <Eye className="h-4 w-4 mr-1" /> {preview ? "Редакция" : "Преглед"}
              </Button>
            </div>

            {!preview && (
              <div className="flex gap-1 mb-2 border-b border-border pb-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("**", "**")}><Bold className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("*", "*")}><Italic className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={insertLink}><LinkIcon className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={insertImage}><Image className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("\n- ")}><List className="h-4 w-4" /></Button>
              </div>
            )}

            {preview ? (
              <div className="prose prose-sm max-w-none min-h-[300px] p-4 bg-muted rounded-lg">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ) : (
              <Textarea
                id="content-editor"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                placeholder="Напишете съдържанието тук в Markdown формат..."
                className="font-mono text-sm"
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Публикувана</Label>
              <Switch checked={published} onCheckedChange={setPublished} />
            </div>
            <Badge variant={published ? "default" : "secondary"}>
              {published ? "Публикувана" : "Чернова"}
            </Badge>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div>
              <Label>Категория</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="напр. Ремонт" />
            </div>
            <div>
              <Label>Тагове (разделени с запетая)</Label>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="ремонт, покрив, съвети" />
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <Label>Корична снимка</Label>
            {coverUrl && (
              <img src={coverUrl} alt="Cover" className="w-full h-40 object-cover rounded-lg" />
            )}
            <label className="flex items-center gap-2 cursor-pointer text-sm text-primary hover:underline">
              <Upload className="h-4 w-4" />
              {uploading ? "Качване..." : "Качи снимка"}
              <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            </label>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="flex-1">
              <Save className="h-4 w-4 mr-2" /> {saving ? "Запазване..." : "Запази"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditorPage;
