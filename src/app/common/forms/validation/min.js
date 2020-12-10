export default function min(min) {
  return (value) => value && (value < min) ? 'Min value is ' + min : undefined
}
