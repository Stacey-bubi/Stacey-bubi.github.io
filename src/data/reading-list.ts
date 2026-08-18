import type { ThemeKey } from './themes'

export interface QueueItem {
  title: string
  theme: ThemeKey
  /** Omitted until the link has been checked. Never guessed. */
  url?: string
  /** Optional half-line on why it is queued. */
  note?: string
}

/**
 * Papers on the list but not yet written up. Titles and links only — no invented
 * summaries. When one gets real notes it moves to src/content/papers/ and comes
 * off this list.
 */
export const READING_LIST: QueueItem[] = [
  {
    title: 'Representation Engineering: A Top-Down Approach to AI Transparency',
    theme: 'erasure',
    url: 'https://arxiv.org/abs/2310.01405',
    note: 'the RepE framework itself — next one I want to write up properly'
  },
  {
    title: 'Improving Alignment and Robustness with Circuit Breakers',
    theme: 'defense',
    url: 'https://arxiv.org/abs/2406.04313',
    note: 'the main representation-level defence; already attacked by Obfuscated Activations'
  },
  {
    title: 'Tamper-Resistant Safeguards for Open-Weight LLMs (TAR)',
    theme: 'defense',
    url: 'https://arxiv.org/abs/2408.00761'
  },
  {
    title: 'There Is More to Refusal in Large Language Models than a Single Direction',
    theme: 'geometry',
    url: 'https://arxiv.org/abs/2602.02132',
    note: 'eleven kinds of refusal, geometrically distinct but one shared control knob'
  },
  {
    title: 'SOM Directions are Better than One: Multi-Directional Refusal Suppression',
    theme: 'attack',
    url: 'https://arxiv.org/abs/2511.08379',
    note: 'self-organising maps to extract many refusal directions; generalises difference-in-means'
  },
  {
    title: 'Refusal in LLMs is an Affine Function',
    theme: 'geometry',
    url: 'https://arxiv.org/abs/2411.09003',
    note: 'affine concept editing — projection plus a bias term, not projection alone'
  },
  {
    title: 'Refusal Falls off a Cliff: How Safety Alignment Fails in Reasoning?',
    theme: 'geometry',
    url: 'https://arxiv.org/abs/2510.06036',
    note: 'reasoning models hold the refusal intention, then drop it at the last tokens'
  },
  {
    title: 'Comparative Analysis of LLM Abliteration Methods: A Cross-Architecture Evaluation',
    theme: 'attack',
    url: 'https://arxiv.org/abs/2512.13655',
    note: 'benchmarks the actual abliteration tools people use'
  },
  {
    title: 'Safety Alignment Should Be Made More Than Just a Few Tokens Deep',
    theme: 'defense',
    url: 'https://arxiv.org/abs/2406.05946',
    note: 'the shallow-alignment result the extended-refusal defence is built on'
  },
  {
    title: 'Fine-tuning Aligned Language Models Compromises Safety',
    theme: 'attack',
    url: 'https://arxiv.org/abs/2310.03693'
  },
  {
    title: 'Universal and Transferable Adversarial Attacks on Aligned Language Models (GCG)',
    theme: 'attack',
    url: 'https://arxiv.org/abs/2307.15043'
  },
  {
    title: 'Model Tampering Attacks Enable More Rigorous Evaluations of LLM Capabilities',
    theme: 'tooling',
    url: 'https://arxiv.org/abs/2502.05209'
  },
  {
    title: 'The WMDP Benchmark: Measuring and Reducing Malicious Use With Unlearning',
    theme: 'tooling',
    url: 'https://arxiv.org/abs/2403.03218',
    note: 'introduces RMU'
  },
  {
    title: 'Does Unlearning Truly Unlearn? A Black Box Evaluation of LLM Unlearning Methods',
    theme: 'erasure',
    url: 'https://arxiv.org/abs/2411.12103'
  },
  {
    title: 'Log-linear Guardedness and its Implications',
    theme: 'erasure',
    url: 'https://arxiv.org/abs/2210.10012'
  },
  {
    title: 'The Hydra Effect: Emergent Self-repair in Language Model Computations',
    theme: 'internals',
    url: 'https://arxiv.org/abs/2307.15771',
    note: 'ablate one component and others compensate — relevant to every ablation result here'
  },
  {
    title: 'Does Localization Inform Editing? Surprising Differences in Where Knowledge Is Stored',
    theme: 'internals',
    url: 'https://arxiv.org/abs/2301.04213'
  },
  {
    title: 'Transformer Circuit Faithfulness Metrics Are Not Robust',
    theme: 'tooling',
    url: 'https://arxiv.org/abs/2407.08734'
  },
  {
    title: 'Open Problems in Mechanistic Interpretability',
    theme: 'tooling',
    url: 'https://arxiv.org/abs/2501.16496'
  },
  {
    title: 'Similarity of Neural Network Representations Revisited (CKA)',
    theme: 'tooling',
    url: 'https://arxiv.org/abs/1905.00414',
    note: 'the "how similar are two representations" cluster, with the two below'
  },
  {
    title: 'SVCCA: Singular Vector Canonical Correlation Analysis',
    theme: 'tooling',
    url: 'https://arxiv.org/abs/1706.05806'
  },
  {
    title: 'Insights on Representational Similarity in Neural Networks with Canonical Correlation',
    theme: 'tooling',
    url: 'https://arxiv.org/abs/1806.05759'
  }
]
