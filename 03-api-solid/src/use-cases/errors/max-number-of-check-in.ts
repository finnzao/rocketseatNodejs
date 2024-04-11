export class MaxNumberOfCheckInError extends Error {
  constructor() {
    super("Max Numbers of check-ins reached");
  }
}
