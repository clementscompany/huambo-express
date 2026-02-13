export class SearchableSelect {
  constructor(element, options, config = {}) {
    this.originalSelect = typeof element === 'string' ? document.getElementById(element) : element;
    if (!this.originalSelect) {
      console.error("SearchableSelect: Element not found", element);
      return;
    }
    this.options = options || [];
    this.config = {
      placeholder: "Selecione...",
      onChange: null,
      ...config
    };
    this.isOpen = false;
    this.selectedValue = null;
    this.init();
  }

  init() {
    // Hide original select
    this.originalSelect.style.display = 'none';

    // Create wrapper
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'searchable-select-wrapper';

    // Create trigger
    this.trigger = document.createElement('div');
    this.trigger.className = 'searchable-select-trigger';
    this.updateTriggerLabel();
    
    // Create dropdown
    this.dropdown = document.createElement('div');
    this.dropdown.className = 'searchable-select-dropdown';
    this.dropdown.style.display = 'none';

    // Create search input
    this.searchInput = document.createElement('input');
    this.searchInput.type = 'text';
    this.searchInput.className = 'searchable-select-search';
    this.searchInput.placeholder = 'Pesquisar...';

    // Create options list
    this.optionsList = document.createElement('ul');
    this.optionsList.className = 'searchable-select-list';

    this.dropdown.appendChild(this.searchInput);
    this.dropdown.appendChild(this.optionsList);
    this.wrapper.appendChild(this.trigger);
    this.wrapper.appendChild(this.dropdown);

    this.originalSelect.parentNode.insertBefore(this.wrapper, this.originalSelect.nextSibling);

    this.renderOptions(this.options);
    this.bindEvents();
    
    // Check if original select has a value
    if (this.originalSelect.value) {
        this.selectValue(this.originalSelect.value, false);
    }
  }

  renderOptions(options) {
    this.optionsList.innerHTML = '';
    if (options.length === 0) {
        const li = document.createElement('li');
        li.className = 'searchable-select-option no-results';
        li.textContent = 'Nenhum resultado encontrado';
        this.optionsList.appendChild(li);
        return;
    }

    options.forEach(opt => {
      const li = document.createElement('li');
      li.className = 'searchable-select-option';
      li.dataset.value = opt.value;
      li.textContent = opt.label;
      if (this.selectedValue === opt.value) {
          li.classList.add('selected');
      }
      
      li.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectValue(opt.value);
          this.close();
      });
      
      this.optionsList.appendChild(li);
    });
  }

  bindEvents() {
    this.trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
    });

    this.searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = this.options.filter(opt => 
            opt.label.toLowerCase().includes(term)
        );
        this.renderOptions(filtered);
    });

    this.searchInput.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('click', (e) => {
        if (!this.wrapper.contains(e.target)) {
            this.close();
        }
    });
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    this.isOpen = true;
    this.dropdown.style.display = 'block';
    this.searchInput.focus();
    this.trigger.classList.add('active');
  }

  close() {
    this.isOpen = false;
    this.dropdown.style.display = 'none';
    this.trigger.classList.remove('active');
    this.searchInput.value = ''; // Reset search
    this.renderOptions(this.options); // Reset list
  }

  selectValue(value, triggerChange = true) {
      this.selectedValue = value;
      this.originalSelect.value = value;
      this.updateTriggerLabel();
      
      // Update visual selection
      const options = this.optionsList.querySelectorAll('.searchable-select-option');
      options.forEach(opt => {
          if (opt.dataset.value == value) opt.classList.add('selected');
          else opt.classList.remove('selected');
      });

      if (triggerChange && this.config.onChange) {
          this.config.onChange(value);
      }
      
      // Trigger change event on original select for compatibility
      if (triggerChange) {
          const event = new Event('change', { bubbles: true });
          this.originalSelect.dispatchEvent(event);
      }
  }

  updateTriggerLabel() {
      const selectedOption = this.options.find(o => o.value == this.selectedValue) || 
                             this.options.find(o => o.value == this.originalSelect.value);
      
      this.trigger.textContent = selectedOption ? selectedOption.label : this.config.placeholder;
      this.trigger.classList.toggle('has-value', !!selectedOption);
  }
  
  // Method to manually set options later
  setOptions(newOptions) {
      this.options = newOptions;
      this.renderOptions(newOptions);
      // Re-evaluate selected value label
      this.updateTriggerLabel();
  }
}