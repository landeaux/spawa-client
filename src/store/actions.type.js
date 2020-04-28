/**
 * Auth module actions
 */
export const CHECK_AUTH = 'checkAuth';
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REGISTER = 'register';
export const UPDATE_USER = 'updateUser';

/**
 * User module actions
 */
export const UPDATE_USER_BY_ID = 'updateUserById';
export const UPDATE_USER_STATE = 'updateUserState';
export const CREATE_USER = 'createUser';
export const FETCH_USERS = 'fetchUsers';
export const SUSPEND_USER = 'suspendUser';
export const ACTIVATE_USER = 'activateUser';
export const DELETE_USER = 'deleteUser';

/**
 * Profile module actions
 */
export const FETCH_PROFILE = 'fetchProfile';
export const FETCH_PROFILE_BY_USERNAME = 'fetchProfileByUsername';

/**
 * Pitch Deck module actions
 */
export const FETCH_PITCH_DECKS = 'fetchPitchDecks';
export const FETCH_PITCH_DECK_BY_ID = 'fetchPitchDeckById';
export const UPLOAD_PITCH_DECK = 'uploadPitchDeck';
export const DOWNLOAD_PITCH_DECK = 'downloadPitchDeckById';
export const SUBMIT_PITCH_DECK_FOR_REVIEW = 'submitPitchDeckForReview';

/**
 * Review module actions
 */
export const CREATE_REVIEW = 'createReview';
export const GET_REVIEW_BY_ID = 'getReviewById';
export const GET_REVIEWS = 'getReviews';
export const GET_REVIEWS_BY_PITCH_DECK_ID = 'getReviewsByPitchDeckId';
export const UPDATE_REVIEW = 'updateReview';
export const DELETE_REVIEW = 'deleteReview';
