const ACTIONS = {
  JOIN: 'join',                   // Triggered when a user joins a room
  JOINED: 'joined',               // Triggered when a user successfully joins
  DISCONNECTED: 'disconnected',   // Triggered when a user disconnects
  CODE_CHANGE: 'code-change',     // Triggered when the code changes in the editor
  SYNC_CODE: 'sync-code',         // Synchronizes the code for a newly joined user
  LEAVE: 'leave',                 // Triggered when a user leaves the room
  REQUEST_JOIN: 'request-join',   // Request to join a room (for moderation, if needed)
  ACCEPT_JOIN: 'accept-join',     // Approves a user's request to join
  REJECT_JOIN: 'reject-join',     // Rejects a user's request to join
  SAVE_FILE: 'save-file',         // Save code changes to a local file
  UPLOAD_FILE: 'upload-file',     // Upload a code file to the editor
  VIDEO_CALL: 'video-call',       // Triggered when a video call starts
  VOICE_CALL: 'voice-call',       // Triggered when a voice call starts
};

module.exports = ACTIONS;
