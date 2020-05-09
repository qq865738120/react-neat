export function ParamsException(message): void {
  this.message = message;
  this.name = "params error";
  this.code = 1000;
}
