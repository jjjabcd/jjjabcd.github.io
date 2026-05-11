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
        },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/2025-04-04-cheminformatics-smiles/";
          
        },
      },{id: "post-pytorch-입문-cpu-vs-gpu-버전-차이와-cuda-가속-확인하기",
        
          title: "PyTorch 입문: CPU vs GPU 버전 차이와 CUDA 가속 확인하기",
        
        description: "PyTorch의 CPU/GPU 버전 차이를 이해하고 CUDA 가속 가능 여부를 확인하는 방법",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/tools-cuda/";
          
        },
      },{id: "post-pytorch-입문-cpu-vs-gpu-버전-차이와-cuda-가속-확인하기",
        
          title: "PyTorch 입문: CPU vs GPU 버전 차이와 CUDA 가속 확인하기",
        
        description: "PyTorch의 CPU/GPU 버전 차이를 이해하고 CUDA 가속 가능 여부를 확인하는 방법",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/tools-pytorch/";
          
        },
      },{id: "post-multi-layer-perceptron",
        
          title: "Multi-Layer Perceptron",
        
        description: "Test post for ML/DL.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/ai-mlp/";
          
        },
      },{id: "post-리눅스-명령어-정리",
        
          title: "리눅스 명령어 정리",
        
        description: "Linux Commend",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/linux-commend/";
          
        },
      },{id: "post-linux-jupyter",
        
          title: "Linux Jupyter",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/linux-jupyter/";
          
        },
      },{id: "post-conda-가상환경에-라이브러리-설치",
        
          title: "Conda 가상환경에 라이브러리 설치",
        
        description: "Miniconda environment 관리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/linux-conda-environment/";
          
        },
      },{id: "post-ubuntu에서-miniconda-설치",
        
          title: "Ubuntu에서 Miniconda 설치",
        
        description: "Miniconda 설치.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/linux-conda-install/";
          
        },
      },{id: "post-a-post-with-jupyter-notebook",
        
          title: "a post with jupyter notebook",
        
        description: "an example of a blog post with jupyter notebook",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/jupyter-notebook/";
          
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
