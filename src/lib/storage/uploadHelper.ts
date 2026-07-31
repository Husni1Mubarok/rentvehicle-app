import { SupabaseClient } from '@supabase/supabase-js';

export async function uploadDocument(supabase: SupabaseClient, file: File, folderName: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${folderName}/${fileName}`;

  const { error } = await supabase.storage
    .from('documents')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading document:', error);
    throw new Error('Gagal mengunggah dokumen: ' + error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from('documents')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
