export default function max(max) {
  return (value) => value && (value > max) ? 'Max value is ' + max : undefined
}
