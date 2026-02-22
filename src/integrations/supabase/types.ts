export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          duration_seconds: number | null
          event_name: string
          event_type: string
          id: string
          page_path: string | null
          session_id: string
        }
        Insert: {
          created_at?: string
          duration_seconds?: number | null
          event_name: string
          event_type: string
          id?: string
          page_path?: string | null
          session_id: string
        }
        Update: {
          created_at?: string
          duration_seconds?: number | null
          event_name?: string
          event_type?: string
          id?: string
          page_path?: string | null
          session_id?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          author_id: string
          category: string
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          budget: number
          created_at: string
          created_by: string
          end_date: string | null
          id: string
          name: string
          notes: string | null
          platform: string
          start_date: string
          updated_at: string
        }
        Insert: {
          budget?: number
          created_at?: string
          created_by: string
          end_date?: string | null
          id?: string
          name: string
          notes?: string | null
          platform?: string
          start_date: string
          updated_at?: string
        }
        Update: {
          budget?: number
          created_at?: string
          created_by?: string
          end_date?: string | null
          id?: string
          name?: string
          notes?: string | null
          platform?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          article_id: string
          author_email: string
          author_name: string
          content: string
          created_at: string
          id: string
          parent_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          article_id: string
          author_email: string
          author_name: string
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          article_id?: string
          author_email?: string
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          client_address: string | null
          client_email: string
          client_name: string
          client_phone: string
          created_at: string
          created_by: string
          custom_clauses: string | null
          id: string
          inquiry_id: string
          material_details: string | null
          quote_id: string
          status: Database["public"]["Enums"]["contract_status"]
          total_price: number
          updated_at: string
        }
        Insert: {
          client_address?: string | null
          client_email: string
          client_name: string
          client_phone: string
          created_at?: string
          created_by: string
          custom_clauses?: string | null
          id?: string
          inquiry_id: string
          material_details?: string | null
          quote_id: string
          status?: Database["public"]["Enums"]["contract_status"]
          total_price?: number
          updated_at?: string
        }
        Update: {
          client_address?: string | null
          client_email?: string
          client_name?: string
          client_phone?: string
          created_at?: string
          created_by?: string
          custom_clauses?: string | null
          id?: string
          inquiry_id?: string
          material_details?: string | null
          quote_id?: string
          status?: Database["public"]["Enums"]["contract_status"]
          total_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          address: string | null
          admin_notes: string | null
          area_sqm: number | null
          assigned_to: string | null
          campaign_id: string | null
          created_at: string
          description: string | null
          email: string
          id: string
          name: string
          phone: string
          preferred_material:
            | Database["public"]["Enums"]["material_type"]
            | null
          roof_complexity: Database["public"]["Enums"]["roof_complexity"] | null
          service_type: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["inquiry_status"]
          updated_at: string
        }
        Insert: {
          address?: string | null
          admin_notes?: string | null
          area_sqm?: number | null
          assigned_to?: string | null
          campaign_id?: string | null
          created_at?: string
          description?: string | null
          email: string
          id?: string
          name: string
          phone: string
          preferred_material?:
            | Database["public"]["Enums"]["material_type"]
            | null
          roof_complexity?:
            | Database["public"]["Enums"]["roof_complexity"]
            | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
        }
        Update: {
          address?: string | null
          admin_notes?: string | null
          area_sqm?: number | null
          assigned_to?: string | null
          campaign_id?: string | null
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          preferred_material?:
            | Database["public"]["Enums"]["material_type"]
            | null
          roof_complexity?:
            | Database["public"]["Enums"]["roof_complexity"]
            | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiry_files: {
        Row: {
          file_name: string
          file_type: string | null
          file_url: string
          id: string
          inquiry_id: string
          uploaded_at: string
        }
        Insert: {
          file_name: string
          file_type?: string | null
          file_url: string
          id?: string
          inquiry_id: string
          uploaded_at?: string
        }
        Update: {
          file_name?: string
          file_type?: string | null
          file_url?: string
          id?: string
          inquiry_id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiry_files_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          created_at: string
          created_by: string
          discount: number
          force_majeure: string | null
          id: string
          inquiry_id: string
          invoicing_schedule: string | null
          items: Json
          manual_additions: string | null
          photo_urls: string[] | null
          sent_at: string | null
          status: Database["public"]["Enums"]["quote_status"]
          subtotal: number
          technical_notes: string | null
          terms: string | null
          total: number
          updated_at: string
          validity_days: number
          warranty_text: string | null
          work_description: string | null
          work_phases: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          discount?: number
          force_majeure?: string | null
          id?: string
          inquiry_id: string
          invoicing_schedule?: string | null
          items?: Json
          manual_additions?: string | null
          photo_urls?: string[] | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          subtotal?: number
          technical_notes?: string | null
          terms?: string | null
          total?: number
          updated_at?: string
          validity_days?: number
          warranty_text?: string | null
          work_description?: string | null
          work_phases?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          discount?: number
          force_majeure?: string | null
          id?: string
          inquiry_id?: string
          invoicing_schedule?: string | null
          items?: Json
          manual_additions?: string | null
          photo_urls?: string[] | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          subtotal?: number
          technical_notes?: string | null
          terms?: string | null
          total?: number
          updated_at?: string
          validity_days?: number
          warranty_text?: string | null
          work_description?: string | null
          work_phases?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "staff"
      contract_status: "draft" | "signed" | "completed"
      inquiry_status:
        | "new"
        | "contacted"
        | "quote_sent"
        | "accepted"
        | "rejected"
      material_type:
        | "tiles"
        | "metal"
        | "bitumen"
        | "pvc_membrane"
        | "shingles"
        | "other"
      quote_status: "draft" | "sent" | "accepted" | "rejected"
      roof_complexity: "single_pitch" | "gable" | "hip" | "complex"
      service_type:
        | "repair"
        | "replacement"
        | "new_construction"
        | "waterproofing"
        | "tiles"
        | "flat_roof"
        | "metal_roof"
        | "maintenance"
        | "leak_repair"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
      contract_status: ["draft", "signed", "completed"],
      inquiry_status: [
        "new",
        "contacted",
        "quote_sent",
        "accepted",
        "rejected",
      ],
      material_type: [
        "tiles",
        "metal",
        "bitumen",
        "pvc_membrane",
        "shingles",
        "other",
      ],
      quote_status: ["draft", "sent", "accepted", "rejected"],
      roof_complexity: ["single_pitch", "gable", "hip", "complex"],
      service_type: [
        "repair",
        "replacement",
        "new_construction",
        "waterproofing",
        "tiles",
        "flat_roof",
        "metal_roof",
        "maintenance",
        "leak_repair",
        "other",
      ],
    },
  },
} as const
