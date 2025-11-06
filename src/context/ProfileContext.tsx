import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useSingleState } from "../utils/hooks/useSingleState";
import { IProfile } from "../interface/settings.interface";

type ProfileContextType = {
  profile: IProfile | null;
  setProfile: (p: IProfile | null) => void;
  updateProfile: (patch: Partial<IProfile>) => void;
  clearProfile: () => void;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

const STORAGE_KEY = "profile";

const getInitialProfile = (): IProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as IProfile) : null;
  } catch {
    return null;
  }
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const profile = useSingleState<IProfile | null>(getInitialProfile());

  const setProfile = (p: IProfile | null) => {
    profile.set(p);
    if (p) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
      } catch {}
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updateProfile = (patch: Partial<IProfile>) => {
    const next = { ...(profile.get ?? {}), ...patch } as IProfile;
    profile.set(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const clearProfile = () => {
    profile.set(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile: profile.get,
        setProfile,
        updateProfile,
        clearProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext)!;