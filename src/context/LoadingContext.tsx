"use client";

import { createContext, useState, ReactNode } from "react";

import Loading from "@/components/Loading";
import RenderIf from "@/components/RenderIf";

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const setIsLoading = (value: boolean) => setLoading(value);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <RenderIf condition={isLoading}>
        <Loading />
      </RenderIf>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
