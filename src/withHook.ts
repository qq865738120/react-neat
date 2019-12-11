export default function withHook(hook, callback) {
  return () => {
    const hooks = hook();
    callback(hooks);
    // return hooks.con;
  };
}
