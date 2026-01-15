import { useMemo } from "react"
import { useAuth } from "@clerk/clerk-react"
import { createApiClient } from "@/lib/api-client"

/**
 * Hook to get an API client instance with Clerk authentication
 */
export function useApiClient() {
  const { getToken } = useAuth()

  const apiClient = useMemo(() => {
    return createApiClient(getToken)
  }, [getToken])

  return apiClient
}
