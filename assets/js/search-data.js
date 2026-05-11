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
      },{id: "post-reinforcement-learning-기초-개념-2-algorithm-classification",
        
          title: "Reinforcement Learning 기초 개념 (2): Algorithm Classification",
        
        description: "Reinforcement Learning algorithm의 model-free, model-based, on-policy, off-policy 분류 정리",
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
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-ocsaug-diffusion-based-optical-chemical-structure-data-augmentation-for-improved-hand-drawn-chemical-structure-image-recognition-has-been-published-in-the-journal-of-supercomputing",
          title: '“OCSAug: Diffusion-based Optical Chemical Structure Data Augmentation for Improved Hand-drawn Chemical Structure Image...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
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
          window.open("/assets/pdf/example_pdf.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
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
