export abstract class Encprypter {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>
}
