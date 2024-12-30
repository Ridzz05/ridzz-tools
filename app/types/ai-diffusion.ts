export interface DiffusionImage {
  id: string
  srcSmall: string
  srcMedium: string
  prompt: string
  width: string
  height: string
}

export interface DiffusionResponse {
  images: DiffusionImage[]
} 