/**
 * Representa un valor JSON que puede ser una cadena, número, booleano, nulo, objeto o arreglo.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

/**
 * Representa la estructura de la base de datos con esquemas, tablas, vistas, funciones, enumeraciones y tipos compuestos.
 */
export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      Proyecto: {
        Row: {
          descripcion: string
          id: string
          integrantes: number
          nombre: string
          tecnologias: string
          usuario_id: string
        }
        Insert: {
          descripcion: string
          id?: string
          integrantes: number
          nombre: string
          tecnologias: string
          usuario_id: string
        }
        Update: {
          descripcion?: string
          id?: string
          integrantes?: number
          nombre?: string
          tecnologias?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'Proyecto_usuario_id_fkey'
            columns: ['usuario_id']
            isOneToOne: false
            referencedRelation: 'Usuario'
            referencedColumns: ['id']
          },
        ]
      }
      Proyecto_Trabajador: {
        Row: {
          id_Proyecto: string
          id_Trabajador: string
        }
        Insert: {
          id_Proyecto?: string
          id_Trabajador?: string
        }
        Update: {
          id_Proyecto?: string
          id_Trabajador?: string
        }
        Relationships: [
          {
            foreignKeyName: 'Proyecto_Trabajador_id_Proyecto_fkey'
            columns: ['id_Proyecto']
            isOneToOne: false
            referencedRelation: 'Proyecto'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Proyecto_Trabajador_id_Trabajador_fkey'
            columns: ['id_Trabajador']
            isOneToOne: false
            referencedRelation: 'Trabajador'
            referencedColumns: ['id']
          },
        ]
      }
      Trabajador: {
        Row: {
          curriculum: string
          id: string
          nombre: string
        }
        Insert: {
          curriculum: string
          id?: string
          nombre: string
        }
        Update: {
          curriculum?: string
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      Usuario: {
        Row: {
          email: string
          id: string
        }
        Insert: {
          email: string
          id?: string
        }
        Update: {
          email?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

/**
 * Representa las tablas y vistas públicas de la base de datos.
 */
type PublicSchema = Database[Extract<keyof Database, 'public'>]

/**
 * Representa las filas de una tabla o vista pública específica.
 */
export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

/**
 * Representa los datos de inserción para una tabla pública específica.
 */
export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

/**
 * Representa los datos de actualización para una tabla pública específica.
 */
export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

/**
 * Representa los valores de una enumeración pública específica.
 */
export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

/**
 * Representa los tipos compuestos de un esquema público específico.
 */
export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
