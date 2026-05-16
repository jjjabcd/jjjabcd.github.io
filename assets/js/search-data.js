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
        },{id: "post-pytorch-입문-cpu-vs-gpu-버전-차이와-cuda-가능-여부-확인하기",
        
          title: "PyTorch 입문: CPU vs GPU 버전 차이와 CUDA 가능 여부 확인하기",
        
        description: "PyTorch의 CPU/GPU 버전 차이를 이해하고 CUDA 가능 여부를 확인하는 방법",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/pytorch/";
          
        },
      },{id: "post-smiles-표기법",
        
          title: "SMILES 표기법",
        
        description: "SMILES 표기법 설명",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/smiles/";
          
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
      },{id: "post-multi-objective-latent-space-optimization-of-generative-molecular-design-models",
        
          title: "Multi-objective latent space optimization of generative molecular design models",
        
        description: "Pareto ranking 기반 weighted retraining을 통한 multi-objective generative molecular design 논문 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/molso/";
          
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
