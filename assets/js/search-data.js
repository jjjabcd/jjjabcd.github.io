// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "This is a description of the page. You can modify it in &#39;_pages/cv.md&#39;. You can also change or remove the top pdf download button.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-rxnflow-generative-flows-on-synthetic-pathway-for-drug-design",
        
          title: "RxnFlow: Generative Flows on Synthetic Pathway for Drug Design",
        
        description: "RxnFlow: Generative Flows on Synthetic Pathway for Drug Design 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/RxnFlow/";
          
        },
      },{id: "post-rgfn-synthesizable-molecular-generation-using-gflownets",
        
          title: "RGFN: Synthesizable Molecular Generation Using GFlowNets",
        
        description: "RGFN: Synthesizable Molecular Generation Using GFlowNets 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/RGFN/";
          
        },
      },{id: "post-multi-objective-gflownets",
        
          title: "Multi-Objective GFlowNets",
        
        description: "Pareto optimal하면서도 diverse한 candidate를 생성하는 Multi-Objective GFlowNet 정리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/MOGFN/";
          
        },
      },{id: "post-gflownet-flow-network-based-generative-models-for-non-iterative-diverse-candidate-generation",
        
          title: "GFlowNet: Flow Network based Generative Models for Non-Iterative Diverse Candidate Generation",
        
        description: "GFlowNet 논문 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/GFlowNet/";
          
        },
      },{id: "post-sparrow-an-algorithmic-framework-for-synthetic-cost-aware-decision-making-in-molecular-design",
        
          title: "SPARROW: An algorithmic framework for synthetic cost-aware decision making in molecular design",
        
        description: "Synthetic cost와 information gain을 동시에 고려하여 molecular design cycle에서 후보 분자와 합성 경로를 선택하는 graph-based optimization framework SPARROW 논문 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/SPARROW/";
          
        },
      },{id: "post-syn-molopt-a-synthesis-planning-driven-molecular-optimization-method-using-data-derived-functional-reaction-templates",
        
          title: "Syn-MolOpt: A Synthesis Planning-Driven Molecular Optimization Method Using Data-Derived Functional Reaction Templates",
        
        description: "Synthesis planning을 통합한 molecular optimization framework Syn-MolOpt 논문 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Syn-MolOpt/";
          
        },
      },{id: "post-amortized-tree-generation-for-bottom-up-synthesis-planning-and-synthesizable-molecular-design",
        
          title: "Amortized Tree Generation for Bottom-Up Synthesis Planning and Synthesizable Molecular Design",
        
        description: "Bottom-up 방식으로 synthetic tree를 생성하여 synthesis planning과 synthesizable molecular design을 동시에 해결하는 amortized 접근법을 제안하는 ICLR 2022 논문 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/SynNet/";
          
        },
      },{id: "post-inchikey를-이용한-동일-분자구조-비교",
        
          title: "InChIKey를 이용한 동일 분자구조 비교",
        
        description: "RDKit과 InChIKey를 이용한 동일 분자구조 비교",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/rdkit-check-smiles/";
          
        },
      },{id: "post-rdkit-기초",
        
          title: "RDKit 기초",
        
        description: "RDKit 사용법 기초",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/rdkit-descriptors/";
          
        },
      },{id: "post-ubuntu-하드웨어-모니터링-cpu-gpu-ram-disk-상태-확인-및-실시간-점검-가이드",
        
          title: "Ubuntu 하드웨어 모니터링: CPU, GPU, RAM, Disk 상태 확인 및 실시간 점검 가이드...",
        
        description: "AI 모델 학습 및 대용량 작업 수행 시 Ubuntu 서버의 CPU, GPU, RAM, Disk 하드웨어 상태를 모니터링하는 명령어 총정리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/linux-monitor/";
          
        },
      },{id: "post-smiles-표기법",
        
          title: "SMILES 표기법",
        
        description: "SMILES 표기법 설명",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/smiles/";
          
        },
      },{id: "post-pytorch-입문-cpu-vs-gpu-버전-차이와-cuda-가능-여부-확인하기",
        
          title: "PyTorch 입문: CPU vs GPU 버전 차이와 CUDA 가능 여부 확인하기",
        
        description: "PyTorch의 CPU/GPU 버전 차이를 이해하고 CUDA 가능 여부를 확인하는 방법",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/pytorch/";
          
        },
      },{id: "post-리눅스-명령어-정리",
        
          title: "리눅스 명령어 정리",
        
        description: "MobaXterm 또는 Terminal 등에서 자주 사용하는 리눅스 명령어 정리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/commend/";
          
        },
      },{id: "post-ssh-접속-후-jupyter-사용하기",
        
          title: "SSH 접속 후 Jupyter 사용하기",
        
        description: "MobaXterm, PuTTY 등을 이용해 원격 서버에서 Jupyter Notebook 및 JupyterLab을 실행하는 방법 정리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/jupyter/";
          
        },
      },{id: "post-environment-yml-amp-requirements-txt-사용법",
        
          title: "environment.yml &amp; requirements.txt 사용법",
        
        description: "Conda 환경 설정을 위한 environment.yml 파일과 pip 패키지 관리를 위한 requirements.txt 활용 가이드",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/conda-env-file/";
          
        },
      },{id: "post-conda-가상환경에-라이브러리-설치",
        
          title: "Conda 가상환경에 라이브러리 설치",
        
        description: "Miniconda 가상환경 생성 및 패키지 관리 방법 정리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/conda-environment/";
          
        },
      },{id: "post-ubuntu에서-miniconda-설치",
        
          title: "Ubuntu에서 Miniconda 설치",
        
        description: "Ubuntu 환경에서 Miniconda를 설치하는 방법 가이드",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/conda-install/";
          
        },
      },{id: "post-mothra-multi-objective-de-novo-molecular-generation-using-monte-carlo-tree-search",
        
          title: "Mothra: Multi-objective de novo Molecular Generation Using Monte Carlo Tree Search",
        
        description: "Pareto Monte Carlo Tree Search 기반 multi-objective de novo molecular generation model인 Mothra 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Mothra/";
          
        },
      },{id: "post-chemmort-an-automatic-admet-optimization-platform-using-deep-learning-and-multi-objective-particle-swarm-optimization",
        
          title: "ChemMORT: an automatic ADMET optimization platform using deep learning and multi-objective particle swarm...",
        
        description: "ChemMORT: an automatic ADMET optimization platform using deep learning and multi-objective particle swarm optimization 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/ChemMORT/";
          
        },
      },{id: "post-multi-objective-latent-space-optimization-of-generative-molecular-design-models",
        
          title: "Multi-objective latent space optimization of generative molecular design models",
        
        description: "Pareto ranking 기반 weighted retraining을 통한 multi-objective generative molecular design 논문 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/MO-LSO/";
          
        },
      },{id: "post-proximal-policy-optimization",
        
          title: "Proximal Policy Optimization",
        
        description: "Proximal Policy Optimization의 기본 개념과 clipped surrogate objective",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/rl-ppo/";
          
        },
      },{id: "post-actor-critic-a2c",
        
          title: "Actor-Critic: A2C",
        
        description: "Actor-Critic: A2C의 기본 개념과 학습 과정",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/rl-a2c/";
          
        },
      },{id: "post-deep-q-network",
        
          title: "Deep Q-Network",
        
        description: "Deep Q-Network의 기본 개념과 학습 과정",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/rl-dqn/";
          
        },
      },{id: "post-reinforce-algorithm",
        
          title: "REINFORCE Algorithm",
        
        description: "REINFORCE algorithm과 REINFORCE with baseline 정리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/rl-reinforce/";
          
        },
      },{id: "post-reinforcement-learning-기초-개념-2-algorithm-types",
        
          title: "Reinforcement Learning 기초 개념 (2): Algorithm Types",
        
        description: "Reinforcement Learning algorithm의 model-free, model-based, on-policy, off-policy, policy-based, value-based 분류 정리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/rl-basic-2/";
          
        },
      },{id: "post-reinforcement-learning-기초-개념-1-concept-mdp-mathematical-formulation",
        
          title: "Reinforcement Learning 기초 개념 (1): Concept, MDP, Mathematical Formulation",
        
        description: "Reinforcement Learning의 기본 개념, MDP, return, objective, policy, value function 정리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/rl-basic-1/";
          
        },
      },{id: "post-repaint-inpainting-using-denoising-diffusion-probabilistic-models",
        
          title: "RePaint: Inpainting using denoising diffusion probabilistic models",
        
        description: "Pretrained unconditional DDPM을 활용하여 mask에 의존하지 않는 image inpainting을 수행하는 RePaint method 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/repaint/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-ocsaug-diffusion-based-optical-chemical-structure-data-augmentation-for-improved-hand-drawn-chemical-structure-image-recognition-has-been-published-in-the-journal-of-supercomputing",
          title: '“OCSAug: Diffusion-based Optical Chemical Structure Data Augmentation for Improved Hand-drawn Chemical Structure Image...',
          description: "",
          section: "News",},{id: "projects-canchem",
          title: 'CanChem',
          description: "분자 구조 이미지 인식을 통한 분자구조 정보 검색 앱",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/cv.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%72%6C%61%77%6C%73%67%75%72%6A%68@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=8ly72dcAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
