module.exports = {
  name: 'reload',
  description: 'reload bot data',
  type: 0,
  execute(refs, msg, args) {
		refs.reload();
  }
}
