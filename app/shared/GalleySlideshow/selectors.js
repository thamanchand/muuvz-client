import { initialState } from './reducer';

/**
 * GallerySlideShow selector
 */

export const gallerySlideShowDomain = state => state.gallerySlideShow || initialState;
