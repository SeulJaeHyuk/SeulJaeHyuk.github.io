(function () {
    var links = [].slice.call(
      document.querySelectorAll('span[data-project-title]')
    );
  
    function navigate(event) {
      var projectTitle = event.target.dataset.projectTitle;
      var project = document.querySelector(
        'div[data-project-title="' + projectTitle + '"]'
      );
  
      if (project) {
        project.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  
    links.map(function (element) {
      element.addEventListener('click', navigate);
    });
  })();
  