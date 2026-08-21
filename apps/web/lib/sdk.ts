import { getLocaleHeader } from "@/lib/get-locale-header"
import Medusa, { FetchArgs, FetchInput } from "@medusajs/js-sdk"

let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

const originalFetch = sdk.client.fetch.bind(sdk.client)

sdk.client.fetch = async <T>(
  input: FetchInput,
  init?: FetchArgs
): Promise<T> => {
  const headers = init?.headers ?? {}
  let localeHeader: Record<string, string | null> | undefined

  try {
    localeHeader = await getLocaleHeader()
    const locale = localeHeader["x-medusa-locale"]

    if (locale && !headers["x-medusa-locale"]) {
      headers["x-medusa-locale"] = locale
    }
  } catch {}

  init = {
    ...init,
    headers: {
      ...localeHeader,
      ...headers,
    },
  }

  return originalFetch(input, init)
}
