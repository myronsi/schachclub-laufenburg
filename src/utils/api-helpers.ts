import { authToken, httpUtils } from '@/lib/auth-utils';

export const getAuthToken = (): string | null => {
  return authToken.get();
};

export const getAuthHeaders = (): Record<string, string> => {
  return httpUtils.getAuthHeaders();
};

export const authenticatedFetch = httpUtils.authenticatedFetch.bind(httpUtils);
export const authenticatedPost = httpUtils.post.bind(httpUtils);
export const authenticatedDelete = httpUtils.delete.bind(httpUtils);
export const authenticatedPut = httpUtils.put.bind(httpUtils);
export const authenticatedPatch = httpUtils.patch.bind(httpUtils);
