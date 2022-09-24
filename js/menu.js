(function () {
    var menuItems = [].slice.call(
      document.querySelectorAll('.menu-item:not([data-bs-toggle="dropdown"])')
    );
    var navItems = menuItems.filter(function (element) {
      if (!element.className.includes('dropdown-item')) {
        return true;
      }
    });
    var dropdown = document.querySelector('.dropdown');
    var dropdownMenu = document.querySelector('.dropdown-menu');
    var dropdownToggle = document.querySelector('[data-bs-toggle="dropdown"]');
    var dropdownItems = menuItems.filter(function (element) {
      if (element.className.includes('dropdown-item')) {
        return true;
      }
    });
  
    function navigateToSection(event) {
      event.preventDefault();
      var sectionId = event.target.dataset.sectionId;
      var section = document.getElementById(sectionId);
  
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  
    function hideDropdownToggle() {
      var visibleDropdownItems = dropdownItems.filter(function (item) {
        if (!item.className.includes('hidden')) {
          return item;
        }
      });
  
      if (visibleDropdownItems.length < 1) {
        dropdownToggle.classList.add('hidden');
      } else {
        dropdownToggle.classList.remove('hidden');
      }
    }
  
    function hideDropdownItem() {
      var firstMenuItem = navItems[0];
      var firstMenuItemOffset = firstMenuItem.getBoundingClientRect();
  
      navItems.map(function (item, index) {
        var offset = item.getBoundingClientRect();
        var dropdownItem = dropdownItems[index];
  
        if (firstMenuItemOffset.y === offset.y) {
          dropdownItem.classList.add('hidden');
        } else {
          dropdownItem.classList.remove('hidden');
        }
      });
    }
  
    function updateDropdownPoisiton() {
      var offsetX = dropdown.offsetLeft;
      var offsetY = dropdown.offsetTop + dropdown.offsetHeight;
      var documentWidth = document.body.clientWidth;
      var space = 10;
  
      if (
        dropdown.offsetLeft + dropdownMenu.offsetWidth + space >
        documentWidth
      ) {
        offsetX -=
          Math.abs(
            dropdown.offsetLeft + dropdownMenu.offsetWidth - documentWidth
          ) + space;
      }
  
      dropdownMenu.style.top = 0;
      dropdownMenu.style.left = 0;
      dropdownMenu.style.transform =
        'translate(' + offsetX + 'px, ' + offsetY + 'px)';
    }
  
    menuItems.map(function (menuItem) {
      menuItem.addEventListener('click', navigateToSection);
    });
    window.addEventListener('resize', hideDropdownToggle);
    window.addEventListener('resize', hideDropdownItem);
    window.addEventListener('resize', updateDropdownPoisiton);
  
    updateDropdownPoisiton();
    hideDropdownItem();
    hideDropdownToggle();
  })();
  