export default function maximinFitness(a, b) {
  let fitness = 1 - Math.max(Math.min(a, b));
  return fitness;
}
