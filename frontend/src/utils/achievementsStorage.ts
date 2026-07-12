import { getUserStorageKey } from './authSession';
import { getCurrentUser } from './authSession';
import { supabase } from '../lib/supabase';

export const ACHIEVEMENT_CATEGORIES = ['Projects', 'Certificates', 'Olympiads', 'Competitions', 'Hackathons', 'Research', 'Leadership', 'Volunteering', 'Sports', 'Arts', 'Internships', 'Other'] as const;
export const ACHIEVEMENT_LEVELS = ['School', 'City', 'State', 'National', 'International'] as const;

export type AchievementCategory = typeof ACHIEVEMENT_CATEGORIES[number];
export type AchievementLevel = typeof ACHIEVEMENT_LEVELS[number];

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  organization: string;
  date: string;
  description: string;
  level: AchievementLevel;
  result: string;
  skillsGained: string[];
  proofLink?: string;
  proofFileName?: string | null;
  proofFileType?: string | null;
  proofFileSize?: number | null;
  proofPreviewUrl?: string | null;
  proofStorageUrl?: string | null;
}

const storageKey = () => getUserStorageKey('achievements') || 'pathpilot_achievements_guest';

export const getAchievements = (): Achievement[] => {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey()) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

export const saveAchievements = (achievements: Achievement[]): void => {
  localStorage.setItem(storageKey(), JSON.stringify(achievements));
};

export const loadAchievementsFromSupabase = async (): Promise<Achievement[]> => {
  const user = getCurrentUser(); if (!user) return [];
  const { data, error } = await supabase.from('achievements').select('*').eq('user_id', user.id).order('date', { ascending: false });
  if (error) throw new Error(`Unable to load achievements: ${error.message}`);
  if (data?.length) { const items = data.map((r) => ({ id:r.id,title:r.title,category:r.category,organization:r.organization||'',date:r.date||'',description:r.description||'',level:r.level,result:r.result||'',skillsGained:r.skills_gained||[],proofLink:r.proof_link||'',proofFileName:r.proof_file_name,proofFileType:r.proof_file_type,proofFileSize:r.proof_file_size,proofPreviewUrl:r.proof_preview_url,proofStorageUrl:r.proof_storage_url } as Achievement)); saveAchievements(items); return items; }
  const legacy=getAchievements(); if(legacy.length){for(const item of legacy) await upsertAchievement(item);} return legacy;
};
export const upsertAchievement = async (item: Achievement) => { const user=getCurrentUser(); if(!user) throw new Error('Session expired.'); const {error}=await supabase.from('achievements').upsert({id:item.id,user_id:user.id,title:item.title,category:item.category,organization:item.organization,date:item.date||null,description:item.description,level:item.level,result:item.result,skills_gained:item.skillsGained,proof_link:item.proofLink||null,proof_file_name:item.proofFileName||null,proof_file_type:item.proofFileType||null,proof_file_size:item.proofFileSize||null,proof_storage_url:item.proofStorageUrl||null},{onConflict:'id'}); if(error) throw new Error(`Unable to save achievement: ${error.message}`); };
export const deleteAchievementRemote = async(id:string)=>{const user=getCurrentUser();if(!user)return;const{error}=await supabase.from('achievements').delete().eq('id',id).eq('user_id',user.id);if(error)throw new Error(`Unable to delete achievement: ${error.message}`);};
export const uploadAchievementProof=async(file:File)=>{const user=getCurrentUser();if(!user)throw new Error('Session expired.');const ext=file.name.split('.').pop()||'bin';const path=`${user.id}/${crypto.randomUUID()}.${ext}`;const{error}=await supabase.storage.from('achievement-proofs').upload(path,file,{contentType:file.type});if(error)throw new Error(`Proof upload failed: ${error.message}`);const{data,error:signedError}=await supabase.storage.from('achievement-proofs').createSignedUrl(path,3600);if(signedError)throw signedError;return{path,signedUrl:data.signedUrl};};

export const getAchievementSummary = (achievements: Achievement[]) => {
  const counts = achievements.reduce<Record<string, number>>((result, achievement) => {
    result[achievement.category] = (result[achievement.category] || 0) + 1;
    return result;
  }, {});
  const levelRank = [...ACHIEVEMENT_LEVELS];
  return {
    total: achievements.length,
    strongestCategory: Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None yet',
    highestLevel: achievements.reduce<AchievementLevel | 'None yet'>((highest, achievement) => {
      if (highest === 'None yet') return achievement.level;
      return levelRank.indexOf(achievement.level) > levelRank.indexOf(highest) ? achievement.level : highest;
    }, 'None yet'),
  };
};
