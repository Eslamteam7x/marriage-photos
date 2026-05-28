"use client"

import useSWR from "swr"
import type { AlbumType } from "@/types"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch data")
  return res.json()
}

export function useAlbums(featured?: boolean) {
  const params = new URLSearchParams()
  if (featured) params.set("featured", "true")

  const { data, error, isLoading, mutate } = useSWR<AlbumType[]>(
    `/api/albums?${params}`,
    fetcher
  )

  return {
    albums: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useAlbum(slug: string) {
  const { data, error, isLoading, mutate } = useSWR<AlbumType>(
    `/api/albums/${slug}`,
    fetcher
  )

  return {
    album: data,
    isLoading,
    isError: error,
    mutate,
  }
}
