---
layout: post
title: "REINFORCE Algorithm"
date: 2024-07-13
categories: ["ML/DL Theory"]
tags:
  - Reinforcement Learning
  - Reinforce
description: "REINFORCE algorithm과 REINFORCE with baseline 정리"
toc:
  sidebar: left
pretty_table: true
---

## Concept

REINFORCE는 stochastic policy를 직접 학습하는 Monte-Carlo policy gradient algorithm이다. REINFORCE는 policy $\pi_\theta(a \mid s)$를 parameterization하고, sampled trajectory에서 얻은 return을 이용해 policy parameter $\theta$를 gradient ascent 방식으로 update한다.

Policy gradient algorithm의 목표는 좋은 결과를 만든 action이 더 높은 probability로 선택되도록 policy를 학습하는 것이다. 반대로 나쁜 결과를 만든 action은 선택 probability가 낮아지도록 update한다.

REINFORCE의 핵심 구성 요소는 다음과 같다.

| Component | Meaning |
|---|---|
| Policy Network | state를 입력받아 action probability를 출력하는 network |
| Objective Function | policy가 생성한 trajectory의 expected return |
| Policy Gradient | objective를 증가시키기 위한 policy parameter의 gradient |
| Monte-Carlo Sampling | sampled trajectory를 이용해 expectation을 근사하는 방법 |

<br>

REINFORCE는 value function이나 environment model을 먼저 학습하지 않아도 policy를 직접 update할 수 있다. 다만 sampled trajectory의 return에 의존하기 때문에 policy gradient estimator의 variance가 커질 수 있다.

## Policy Network

Policy $\pi$는 state $s$를 action probability에 연결하는 함수이다. 가능한 action이 $a_1, a_2, \cdots, a_n$일 때, policy는 각 action이 선택될 probability를 출력한다.

$$
(p_{a_1}, p_{a_2}, \cdots, p_{a_n})
=
\pi(s)
$$

각 action probability는 다음과 같이 표현할 수 있다.

$$
p_{a_k}
=
\pi(a_k \mid s)
$$

Policy는 action을 직접 결정하는 deterministic function일 수도 있지만, REINFORCE에서는 stochastic policy를 사용한다. 즉, action은 policy distribution에서 sampling된다.

$$
a \sim \pi(\cdot \mid s)
$$

Deep Reinforcement Learning에서는 policy를 deep neural network로 parameterization할 수 있다. 이를 policy network라고 하며, parameter $\theta$를 갖는 policy를 $\pi_\theta$로 표현한다.

$$
\pi_\theta(a \mid s)
=
P(a_t = a \mid s_t = s; \theta)
$$

Policy parameter $\theta$가 달라지면 같은 state $s$에 대해서도 action probability distribution이 달라진다. 따라서 좋은 policy를 찾는 문제는 objective function을 maximize하는 optimal parameter $\theta^*$를 찾는 문제로 바뀐다.

## Objective Function

REINFORCE에서 agent는 environment와 상호작용하며 trajectory $\tau$를 생성한다. 하나의 trajectory는 state, action, reward로 이루어진 experience sequence이다.

$$
\tau = [(s_0, a_0, r_0), \cdots, (s_T, a_T, r_T)]
$$

위 수식에서 $s_t$는 time step $t$의 state를 의미하고, $a_t$는 action을 의미한다. $r_t$는 time step $t$에서 environment로부터 받은 reward를 의미한다.

Time step $t$에서의 return은 다음과 같이 정의한다.

$$
R_t(\tau)
=
\sum_{t'=t}^{T}
\gamma^{t'-t}
r_{t'}
$$

위 수식에서 $R_t(\tau)$는 time step $t$부터 trajectory가 끝날 때까지 얻는 return을 의미한다. $r_{t'}$는 time step $t'$에서 얻은 reward이고, $\gamma$는 future reward를 얼마나 반영할지 결정하는 discount factor이다.

여기서 return은 reward를 단순히 더한 cumulative reward가 아니라, discount factor $\gamma$를 반영한 reward sum으로 이해할 수 있다.

$t=0$일 때의 return은 전체 trajectory에 대한 return이 된다.

$$
R_0(\tau)
=
R(\tau)
$$

따라서 전체 trajectory return은 다음과 같이 쓸 수 있다.

$$
R(\tau)
=
\sum_{t=0}^{T}
\gamma^t r_t
$$

## Objective Function

REINFORCE의 objective function은 policy $\pi_\theta$가 생성할 수 있는 trajectory의 return에 대한 expectation이다.

$$
J(\pi_\theta)
=
\mathbb{E}_{\tau \sim \pi_\theta}
[R(\tau)]
$$

전체 trajectory return을 대입하면 다음과 같다.

$$
J(\pi_\theta)
=
\mathbb{E}_{\tau \sim \pi_\theta}
\left[
\sum_{t=0}^{T}
\gamma^t r_t
\right]
$$

위 수식은 policy $\pi_\theta$로부터 sampling된 많은 trajectory에 대해 return의 expectation을 계산해야 함을 의미한다. 하지만 실제로는 모든 가능한 trajectory를 계산할 수 없기 때문에, sampled trajectory를 이용해 expectation을 근사한다.

Monte-Carlo Sampling을 사용하면 다음과 같이 expectation을 sample mean으로 근사할 수 있다.

$$
\mathbb{E}_{\tau \sim \pi_\theta}
[R(\tau)]
\approx
\frac{1}{N}
\sum_{i=1}^{N}
R(\tau^{(i)})
$$

위 수식에서 $N$은 sampled trajectory 개수이고, $\tau^{(i)}$는 $i$번째 sampled trajectory를 의미한다.

## Policy Gradient

Policy gradient algorithm은 objective $J(\pi_\theta)$를 maximize하는 optimal policy parameter $\theta^*$를 찾는 방법이다.

$$
\theta^*
=
\arg\max_{\theta}
J(\pi_\theta)
$$

이를 위해 policy parameter $\theta$에 대해 gradient ascent를 수행한다.

$$
\theta
\leftarrow
\theta
+
\alpha
\nabla_\theta J(\pi_\theta)
$$

위 수식에서 $\alpha$는 learning rate이고, $\nabla_\theta J(\pi_\theta)$는 policy parameter $\theta$에 대한 policy gradient를 의미한다.

앞에서 정의한 objective function을 이용해 policy gradient를 계산하면 다음과 같다.

$$
\nabla_\theta J(\pi_\theta)
=
\nabla_\theta
\left(
\mathbb{E}_{\tau \sim \pi_\theta}
\left[
\sum_{t=0}^{T}
\gamma^t r_t
\right]
\right)
$$

Monte-Carlo Sampling을 사용하면 expectation은 sampled trajectory들의 평균으로 근사된다.

$$
\nabla_\theta J(\pi_\theta)
\approx
\nabla_\theta
\left(
\frac{1}{N}
\sum_{i=1}^{N}
\sum_{t=0}^{T^{(i)}}
\gamma^t r_t^{(i)}
\right)
$$

이를 그대로 미분하면 다음과 같은 문제가 발생한다.

$$
\begin{aligned}
\nabla_\theta J(\pi_\theta)
&\approx
\nabla_\theta
\left(
\frac{1}{N}
\sum_{i=1}^{N}
\sum_{t=0}^{T^{(i)}}
\gamma^t r_t^{(i)}
\right)
\\
&=
\frac{1}{N}
\sum_{i=1}^{N}
\nabla_\theta
\left(
\sum_{t=0}^{T^{(i)}}
\gamma^t r_t^{(i)}
\right)
\\
&=
\frac{1}{N}
\sum_{i=1}^{N}
0
\\
&=
0
\end{aligned}
$$

첫 번째 줄은 expected return의 gradient를 Monte-Carlo sampled trajectory들의 평균으로 근사한 것이다.

두 번째 줄은 gradient operator를 sample mean 내부로 이동한 것이다.

세 번째 줄에서 sampled trajectory의 reward sequence는 이미 environment에서 관측된 scalar value이다. 즉, sampling이 끝난 후의 $\sum_{t=0}^{T^{(i)}} \gamma^t r_t^{(i)}$는 policy parameter $\theta$에 대해 직접 differentiable한 함수가 아니므로 gradient가 0이 된다.

이 결과는 policy $\pi_\theta$가 action을 선택했고, 그 action이 return에 영향을 주었다는 사실을 반영하지 못한다. 따라서 REINFORCE에서는 return 자체를 직접 미분하지 않고, trajectory가 sampling될 probability가 policy parameter $\theta$에 따라 어떻게 변하는지를 이용한다.

## Policy Gradient with Log-derivative Trick

위 문제를 해결하기 위해 log-derivative trick을 사용한다. 핵심은 probability의 gradient를 log-probability의 gradient로 바꾸는 것이다.

먼저 log function의 미분 성질은 다음과 같다.

$$
\nabla_\theta
\log p_\theta(\tau)
=
\frac{
\nabla_\theta p_\theta(\tau)
}{
p_\theta(\tau)
}
$$

양변에 $p_\theta(\tau)$를 곱하면 다음과 같다.

$$
p_\theta(\tau)
\nabla_\theta
\log p_\theta(\tau)
=
\nabla_\theta
p_\theta(\tau)
$$

따라서 다음 관계를 얻는다.

$$
\nabla_\theta
p_\theta(\tau)
=
p_\theta(\tau)
\nabla_\theta
\log p_\theta(\tau)
$$

이 식을 log-derivative trick이라고 한다. 이 변환을 사용하면 trajectory가 sampling될 probability의 gradient를 gradient of log-probability 형태로 바꿀 수 있다.

REINFORCE의 objective는 다음과 같다.

$$
J(\pi_\theta)
=
\mathbb{E}_{\tau \sim \pi_\theta}
[R(\tau)]
$$

Expectation을 trajectory distribution에 대한 integral 형태로 쓰면 다음과 같다.

$$
J(\pi_\theta)
=
\int
p_{\pi_\theta}(\tau)
R(\tau)
d\tau
$$

여기서 $p_{\pi_\theta}(\tau)$는 policy $\pi_\theta$와 transition probability에 의해 trajectory $\tau$가 sampling될 probability를 의미한다.

이제 objective를 $\theta$에 대해 미분하면 다음과 같다.

$$
\begin{aligned}
\nabla_\theta J(\pi_\theta)
&=
\nabla_\theta
\left(
\int [
p_{\pi_\theta}(\tau)
R(\tau)
] d\tau
\right)
\\
&=
\int [
\nabla_\theta
p_{\pi_\theta}(\tau)
R(\tau)
] d\tau
\\
&=
\int [
p_{\pi_\theta}(\tau)
\nabla_\theta
\log p_{\pi_\theta}(\tau)
R(\tau)
] d\tau
\\
&=
\mathbb{E}_{\tau \sim \pi_\theta}
\left[
\nabla_\theta
\log p_{\pi_\theta}(\tau)
R(\tau)
\right]
\end{aligned}
$$

첫 번째 줄은 objective $J(\pi_\theta)$를 policy parameter $\theta$에 대해 미분한 것이다.

두 번째 줄은 return $R(\tau)$가 $\theta$에 직접 의존하지 않는다고 보고, gradient를 trajectory가 sampling될 probability $p_{\pi_\theta}(\tau)$에 적용한 것이다.

세 번째 줄은 log-derivative trick을 적용하여 $\nabla_\theta p_{\pi_\theta}(\tau)$를 $p_{\pi_\theta}(\tau)\nabla_\theta \log p_{\pi_\theta}(\tau)$로 바꾼 것이다.

네 번째 줄은 다시 expectation 형태로 정리한 것이다.

이제 sampled return을 직접 미분해서 0이 되는 문제가 아니라, trajectory가 sampling될 probability의 log-gradient를 이용해 policy update 방향을 계산할 수 있다.

## Rollout of Log-probability

Trajectory $\tau$가 sampling될 probability는 initial state distribution, transition probability, policy probability의 곱으로 표현된다.

$$
\begin{aligned}
p_{\pi_\theta}(\tau)
&=
p(s_0)
\pi_\theta(a_0 \mid s_0)
P(s_1 \mid s_0, a_0)
\pi_\theta(a_1 \mid s_1)
P(s_2 \mid s_1, a_1)
\cdots
\pi_\theta(a_T \mid s_T)
\\
&=
p(s_0)
\prod_{t=0}^{T}
P(s_{t+1} \mid s_t, a_t)
\pi_\theta(a_t \mid s_t)
\end{aligned}
$$

위 수식에서 $p(s_0)$는 initial state distribution을 의미한다. $P(s_{t+1} \mid s_t, a_t)$는 transition probability 또는 transition function을 의미한다. $\pi_\theta(a_t \mid s_t)$는 policy가 state $s_t$에서 action $a_t$를 선택할 probability를 의미한다.

수식 표현의 편의를 위해 terminal 이후의 transition probability는 $P(s_{T+1} \mid s_T,a_T)=1$로 둘 수 있다. 이 경우 product를 $t=0$부터 $T$까지 표현할 수 있다.

양변에 log를 취하면 곱은 합으로 바뀐다.

$$
\begin{aligned}
\log p_{\pi_\theta}(\tau)
&=
\log
\left[
p(s_0)
\prod_{t=0}^{T}
P(s_{t+1} \mid s_t, a_t)
\pi_\theta(a_t \mid s_t)
\right]
\\
&=
\log p(s_0)
+
\log
\prod_{t=0}^{T}
P(s_{t+1} \mid s_t, a_t)
\pi_\theta(a_t \mid s_t)
\\
&=
\log p(s_0)
+
\sum_{t=0}^{T}
\log
\left[
P(s_{t+1} \mid s_t, a_t)
\pi_\theta(a_t \mid s_t)
\right]
\\
&=
\log p(s_0)
+
\sum_{t=0}^{T}
\log P(s_{t+1} \mid s_t, a_t)
+
\sum_{t=0}^{T}
\log \pi_\theta(a_t \mid s_t)
\end{aligned}
$$

첫 번째 줄은 trajectory가 sampling될 probability에 log를 취한 것이다.

두 번째 줄은 product 전체를 initial state distribution과 나머지 product로 나눈 것이다.

세 번째 줄은 product의 log가 log의 sum으로 바뀐다는 성질을 사용한 것이다.

네 번째 줄은 transition probability와 policy probability의 곱을 각각의 log term으로 분리한 것이다.

## Gradient of Log-probability

이제 $\log p_{\pi_\theta}(\tau)$를 policy parameter $\theta$에 대해 미분한다.

$$
\begin{aligned}
\nabla_\theta
\log p_{\pi_\theta}(\tau)
&=
\nabla_\theta
\log p(s_0)
+
\nabla_\theta
\sum_{t=0}^{T}
\log P(s_{t+1} \mid s_t, a_t)
+
\nabla_\theta
\sum_{t=0}^{T}
\log \pi_\theta(a_t \mid s_t)
\\
&=
0
+
0
+
\sum_{t=0}^{T}
\nabla_\theta
\log \pi_\theta(a_t \mid s_t)
\\
&=
\sum_{t=0}^{T}
\nabla_\theta
\log \pi_\theta(a_t \mid s_t)
\end{aligned}
$$

첫 번째 줄은 trajectory가 sampling될 probability의 log-gradient를 initial state distribution, transition probability, policy probability로 나누어 계산한 것이다.

두 번째 줄에서 $p(s_0)$와 $P(s_{t+1} \mid s_t, a_t)$는 policy parameter $\theta$에 직접 의존하지 않으므로 gradient가 0이 된다.

세 번째 줄에서는 policy log-probability gradient만 남는다.

따라서 REINFORCE에서 핵심적으로 사용하는 gradient term은 다음과 같다.

$$
\nabla_\theta
\log
\pi_\theta(a_t \mid s_t)
$$

이 term은 state $s_t$에서 action $a_t$가 선택될 log-probability를 policy parameter $\theta$에 대해 미분한 값이다.

## Policy Gradient Final Form

앞에서 얻은 gradient of log-probability를 policy gradient 식에 대입하면 다음과 같다.

$$
\begin{aligned}
\nabla_\theta J(\pi_\theta)
&=
\mathbb{E}_{\tau \sim \pi_\theta}
\left[
\nabla_\theta
\log p_{\pi_\theta}(\tau)
R(\tau)
\right]
\\
&=
\mathbb{E}_{\tau \sim \pi_\theta}
\left[
\sum_{t=0}^{T}
\nabla_\theta
\log
\pi_\theta(a_t \mid s_t)
R(\tau)
\right]
\end{aligned}
$$

이 식은 return $R(\tau)$가 큰 trajectory에서 선택된 action들의 log-probability를 증가시키는 방향으로 policy를 update한다는 의미를 가진다.

Full trajectory return을 time step $t$ 이후의 return으로 바꾸면 reward-to-go 형태가 된다. Time step $t$의 action $a_t$는 과거 reward에 영향을 줄 수 없기 때문에, $a_t$의 update에는 $t$ 이후의 reward만 사용하는 것이 더 적절하다.

$$
R_t(\tau)
=
\sum_{t'=t}^{T}
\gamma^{t'-t}
r_{t'}
$$

이를 사용하면 policy gradient는 다음과 같이 표현된다.

$$
\nabla_\theta J(\pi_\theta)
=
\mathbb{E}_{\tau \sim \pi_\theta}
\left[
\sum_{t=0}^{T}
\nabla_\theta
\log
\pi_\theta(a_t \mid s_t)
R_t(\tau)
\right]
$$

여기서 $R_t(\tau)$는 reward-to-go로 해석할 수 있다.

## Policy Gradient with Monte-Carlo Sampling

실제로는 모든 trajectory에 대한 expectation을 계산할 수 없기 때문에 Monte-Carlo Sampling으로 policy gradient를 근사한다.

$$
\begin{aligned}
\nabla_\theta J(\pi_\theta)
&=
\nabla_\theta
\mathbb{E}_{\tau \sim \pi_\theta}
[R(\tau)]
\\
&\approx
\frac{1}{N}
\sum_{i=1}^{N}
\nabla_\theta
\log p_{\pi_\theta}(\tau^{(i)})
R(\tau^{(i)})
\\
&=
\frac{1}{N}
\sum_{i=1}^{N}
\sum_{t=0}^{T^{(i)}}
\nabla_\theta
\log
\pi_\theta(a_t^{(i)} \mid s_t^{(i)})
R_t(\tau^{(i)})
\\
&=
\frac{1}{N}
\sum_{i=1}^{N}
\sum_{t=0}^{T^{(i)}}
\nabla_\theta
\log
\pi_\theta(a_t^{(i)} \mid s_t^{(i)})
\sum_{t'=t}^{T^{(i)}}
\gamma^{t'-t}
r_{t'}^{(i)}
\end{aligned}
$$

첫 번째 줄은 policy objective의 gradient이다.

두 번째 줄은 sampled trajectory $N$개를 이용해 expectation을 sample mean으로 근사한 것이다.

세 번째 줄은 trajectory log-probability gradient를 policy log-probability gradient의 sum으로 바꾼 것이다.

네 번째 줄은 reward-to-go $R_t(\tau^{(i)})$를 return의 정의로 풀어쓴 것이다.

따라서 REINFORCE는 sampled trajectory를 이용해 policy gradient를 추정하고, 이를 이용해 policy parameter를 update한다.

## REINFORCE 알고리즘

REINFORCE는 reward-to-go 기반 policy gradient estimator를 Monte-Carlo 방식으로 계산하고, policy parameter를 gradient ascent로 update하는 episodic policy gradient algorithm이다.

REINFORCE의 update 식은 다음과 같다.

$$
\theta
\leftarrow
\theta
+
\alpha
\sum_{t=0}^{T}
R_t(\tau)
\nabla_\theta
\log
\pi_\theta(a_t \mid s_t)
$$

위 수식에서 $R_t(\tau)$는 time step $t$ 이후의 return이고, $\nabla_\theta \log \pi_\theta(a_t \mid s_t)$는 현재 policy가 선택한 action의 log-probability gradient를 의미한다.

REINFORCE의 전체 흐름은 다음과 같이 정리할 수 있다.

1. Learning rate $\alpha$를 초기화한다.

2. Policy network $\pi_\theta$의 parameter $\theta$를 초기화한다.

3. 현재 policy $\pi_\theta$를 사용해 trajectory $\tau = [(s_0, a_0, r_0), \cdots, (s_T, a_T, r_T)]$를 sampling한다.

4. Policy gradient estimate를 0으로 초기화한다.

5. 각 time step $t$에 대해 return $R_t(\tau)$를 계산한다.

6. $R_t(\tau)\nabla_\theta \log \pi_\theta(a_t \mid s_t)$를 policy gradient estimate에 누적한다.

7. Gradient ascent로 $\theta$를 update한다.

8. 위 과정을 여러 episode 동안 반복한다.

이 update는 다음과 같이 해석할 수 있다.

- $R_t(\tau)$가 크면 action $a_t$의 log-probability를 증가시키는 방향으로 update된다.
- $R_t(\tau)$가 작거나 음수이면 action $a_t$의 log-probability를 감소시키는 방향으로 update된다.
- Policy는 높은 return을 얻는 trajectory를 더 자주 생성하도록 학습된다.
- Transition probability를 명시적으로 학습하지 않아도 policy를 직접 optimize할 수 있다.

## REINFORCE의 한계점

REINFORCE는 Monte-Carlo Sampling을 이용하여 생성된 trajectory에 대한 policy gradient를 추정한다. 이러한 추정은 policy gradient에 대한 unbiased estimate이지만, 큰 variance를 가질 수 있다.

Variance가 커지는 주요 원인은 다음과 같다.

| 원인 | 설명 |
|---|---|
| Stochastic action sampling | action이 policy distribution에서 sampling되므로 같은 state에서도 다른 action이 선택될 수 있다. |
| Random initial state | episode마다 initial state가 달라질 수 있다. |
| Stochastic transition function | transition function이 stochastic하면 같은 action을 선택해도 다른 next state가 나올 수 있다. |
| Long-horizon return | 긴 trajectory에서는 return이 크게 변동할 수 있다. |

<br>

Variance가 크면 policy update 방향이 불안정해지고 training이 느리게 수렴할 수 있다. 따라서 REINFORCE에서는 variance reduction 전략이 중요하다.

## REINFORCE with Baseline

REINFORCE의 variance를 줄이는 대표적인 방법은 return에서 baseline을 빼는 것이다.

$$
\nabla_\theta J(\pi_\theta)
=
\sum_{t=0}^{T}
\nabla_\theta
\log
\pi_\theta(a_t \mid s_t)
\left(
R_t(\tau) - b(s_t)
\right)
$$

위 수식에서 $b(s_t)$는 baseline function을 의미한다. Baseline은 action $a_t$에 직접 의존하지 않는 함수여야 한다. Action에 의존하지 않는 baseline을 빼면 gradient estimator의 expectation은 유지하면서 variance를 줄일 수 있다.

대표적인 baseline은 state value function과 average return이다.

| Baseline | 수식 | 해석 |
|---|---|---|
| State value function | $b(s_t)=V^\pi(s_t)$ | 현재 state에서 policy를 따를 때 기대되는 return을 기준값으로 사용한다. |
| Average return | $b=\frac{1}{T}\sum_{t'=0}^{T}R_{t'}(\tau)$ | 하나의 trajectory 또는 batch에서 평균 return을 기준값으로 사용한다. |

<br>

State value function을 baseline으로 사용하면 REINFORCE with baseline은 다음과 같이 표현된다.

$$
\nabla_\theta J(\pi_\theta)
=
\sum_{t=0}^{T}
\nabla_\theta
\log
\pi_\theta(a_t \mid s_t)
\left(
R_t(\tau) - V^\pi(s_t)
\right)
$$

Average return을 baseline으로 사용하면 다음과 같이 표현된다.

$$
\nabla_\theta J(\pi_\theta)
=
\sum_{t=0}^{T}
\nabla_\theta
\log
\pi_\theta(a_t \mid s_t)
\left(
R_t(\tau)
-
\frac{1}{T}
\sum_{t'=0}^{T}
R_{t'}(\tau)
\right)
$$

$R_t(\tau) - V^\pi(s_t)$는 advantage estimate로 해석할 수 있다.

$$
A^\pi(s_t,a_t)
\approx
R_t(\tau) - V^\pi(s_t)
$$

Advantage는 특정 state에서 선택한 action이 평균적인 policy behavior보다 얼마나 좋은지를 나타낸다.

- $R_t(\tau) > V^\pi(s_t)$이면 action $a_t$는 해당 state의 평균 기대값보다 좋은 action으로 해석된다.
- $R_t(\tau) < V^\pi(s_t)$이면 action $a_t$는 해당 state의 평균 기대값보다 나쁜 action으로 해석된다.
- 따라서 REINFORCE with baseline은 단순히 return이 큰 action을 강화하는 것이 아니라, state 기준으로 상대적으로 좋은 action을 강화한다.

기본 REINFORCE와 REINFORCE with baseline의 차이는 다음과 같다.

| 항목 | REINFORCE | REINFORCE with Baseline |
|---|---|---|
| Update signal | $R_t(\tau)$ | $R_t(\tau)-b(s_t)$ |
| 대표 baseline | 없음 | $V^\pi(s_t)$ 또는 average return |
| Bias | Unbiased | Unbiased |
| Variance | 큼 | 상대적으로 작음 |
| 해석 | return이 큰 action 강화 | state 기준으로 상대적으로 좋은 action 강화 |

<br>

REINFORCE with baseline은 기본 REINFORCE와 같은 expected gradient direction을 유지하면서 variance를 줄이는 방법이다. Baseline은 reward signal 자체를 바꾸는 것이 아니라, policy gradient estimator의 scale을 조정하는 역할을 한다.

## Summary

REINFORCE는 stochastic policy $\pi_\theta(a \mid s)$를 직접 학습하는 Monte-Carlo policy gradient algorithm이다.

Policy gradient를 naive하게 sampled return에 대해 직접 미분하면, sampled return은 policy parameter $\theta$에 대해 직접 differentiable하지 않기 때문에 gradient가 0이 된다.

이를 해결하기 위해 log-derivative trick을 사용하여 trajectory가 sampling될 probability의 gradient를 gradient of log-probability로 바꾼다.

Trajectory가 sampling될 probability에 log를 취하고 $\theta$로 미분하면, initial state distribution과 transition probability는 $\theta$에 의존하지 않기 때문에 사라지고 policy log-probability gradient만 남는다.

REINFORCE는 Monte-Carlo Sampling으로 policy gradient를 추정하고, return $R_t(\tau)$를 이용해 action log-probability를 update한다.

REINFORCE는 unbiased policy gradient estimator를 제공하지만 variance가 클 수 있다.

REINFORCE with baseline은 return에서 baseline $b(s_t)$를 빼서 variance를 줄이는 방법이다.