export default function upState(hook) {
  const hooks = hook();
  console.log("hooks", hooks);
  return hooks;
}
