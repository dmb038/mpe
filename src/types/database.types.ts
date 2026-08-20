/**
 * Hand-authored to match supabase/migrations/*.sql, in the same shape
 * `supabase gen types typescript` produces. Once a real Supabase project
 * exists, regenerate the authoritative version with:
 *
 *   pnpm supabase gen types typescript --project-id <project-ref> > src/types/database.types.ts
 */

export type ResidentRole = "resident" | "board" | "admin";
export type ResidentStatus = "unclaimed" | "pending_verification" | "active" | "disabled";
export type FlockRequestStatus = "new" | "in_review" | "fulfilled" | "closed";
export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

export interface Database {
  public: {
    Tables: {
      residents: {
        Row: {
          id: string;
          full_name: string;
          address_line1: string;
          address_line2: string | null;
          city: string;
          state: string;
          zip: string;
          csv_email: string;
          csv_mobile: string;
          household_members: string[];
          display_email: string | null;
          display_phone: string | null;
          auth_user_id: string | null;
          role: ResidentRole;
          status: ResidentStatus;
          imported_at: string | null;
          imported_batch_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          address_line1: string;
          address_line2?: string | null;
          city?: string;
          state?: string;
          zip: string;
          csv_email: string;
          csv_mobile: string;
          household_members?: string[];
          display_email?: string | null;
          display_phone?: string | null;
          auth_user_id?: string | null;
          role?: ResidentRole;
          status?: ResidentStatus;
          imported_at?: string | null;
          imported_batch_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["residents"]["Insert"]>;
        Relationships: [];
      };
      directory_preferences: {
        Row: {
          resident_id: string;
          show_in_directory: boolean;
          show_email: boolean;
          show_phone: boolean;
          show_household: boolean;
          updated_at: string;
        };
        Insert: {
          resident_id: string;
          show_in_directory?: boolean;
          show_email?: boolean;
          show_phone?: boolean;
          show_household?: boolean;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["directory_preferences"]["Insert"]>;
        Relationships: [];
      };
      email_verification_codes: {
        Row: {
          id: string;
          resident_id: string;
          email: string;
          code_hash: string;
          expires_at: string;
          consumed_at: string | null;
          attempt_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          resident_id: string;
          email: string;
          code_hash: string;
          expires_at: string;
          consumed_at?: string | null;
          attempt_count?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["email_verification_codes"]["Insert"]>;
        Relationships: [];
      };
      flock_requests: {
        Row: {
          id: string;
          requester_name: string;
          requester_email: string;
          incident_datetime: string | null;
          incident_date_text: string | null;
          description: string;
          status: FlockRequestStatus;
          admin_notes: string | null;
          created_at: string;
          reviewed_by: string | null;
          reviewed_at: string | null;
        };
        Insert: {
          id?: string;
          requester_name: string;
          requester_email: string;
          incident_datetime?: string | null;
          incident_date_text?: string | null;
          description: string;
          status?: FlockRequestStatus;
          admin_notes?: string | null;
          created_at?: string;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["flock_requests"]["Insert"]>;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
        Relationships: [];
      };
      csv_imports: {
        Row: {
          id: string;
          imported_by: string;
          filename: string | null;
          rows_total: number;
          rows_inserted: number;
          rows_updated: number;
          rows_flagged: number;
          rows_skipped: number;
          errors: { address: string | null; reason: string }[];
          created_at: string;
        };
        Insert: {
          id?: string;
          imported_by: string;
          filename?: string | null;
          rows_total: number;
          rows_inserted: number;
          rows_updated: number;
          rows_flagged?: number;
          rows_skipped?: number;
          errors?: { address: string | null; reason: string }[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["csv_imports"]["Insert"]>;
        Relationships: [];
      };
      webauthn_credentials: {
        Row: {
          id: string;
          resident_id: string;
          credential_id: string;
          public_key: string;
          counter: number;
          transports: string[] | null;
          device_label: string | null;
          created_at: string;
          last_used_at: string | null;
        };
        Insert: {
          id?: string;
          resident_id: string;
          credential_id: string;
          public_key: string;
          counter?: number;
          transports?: string[] | null;
          device_label?: string | null;
          created_at?: string;
          last_used_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["webauthn_credentials"]["Insert"]>;
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          stripe_intent_id: string;
          amount_cents: number;
          currency: string;
          status: PaymentStatus;
          payer_name: string;
          payer_email: string;
          payer_resident_id: string | null;
          description: string | null;
          metadata: Record<string, any> | null;
          created_at: string;
          updated_at: string;
          succeeded_at: string | null;
        };
        Insert: {
          id?: string;
          stripe_intent_id: string;
          amount_cents: number;
          currency?: string;
          status?: PaymentStatus;
          payer_name: string;
          payer_email: string;
          payer_resident_id?: string | null;
          description?: string | null;
          metadata?: Record<string, any> | null;
          created_at?: string;
          updated_at?: string;
          succeeded_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: {
      directory_view: {
        Row: {
          id: string;
          full_name: string;
          address_line1: string;
          city: string;
          zip: string;
          email: string | null;
          phone: string | null;
          household_members: string[] | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      import_residents: {
        Args: { p_rows: unknown; p_imported_by: string; p_filename: string | null };
        Returns: Database["public"]["Tables"]["csv_imports"]["Row"];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
