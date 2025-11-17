// Component counter
let componentCounter = 0;
let selectedElement = null;
let history = [];
let historyIndex = -1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeDragAndDrop();
    initializeCollapsibleSections();
    initializeHeaderActions();
    initializeCanvas();
    saveState();
});

// Drag and Drop
function initializeDragAndDrop() {
    const componentItems = document.querySelectorAll('.component-item');
    const canvas = document.getElementById('canvasContent');
    
    componentItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
    canvas.addEventListener('click', handleCanvasClick);
}

function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', JSON.stringify({
        type: e.target.dataset.type,
        component: e.target.dataset.component
    }));
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleDrop(e) {
    e.preventDefault();
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    createCanvasElement(data.type, data.component, x, y);
    saveState();
}

// Create Canvas Element
function createCanvasElement(type, component, x, y) {
    componentCounter++;
    const element = document.createElement('div');
    element.className = 'canvas-element';
    element.id = `element-${componentCounter}`;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.dataset.type = type;
    element.dataset.component = component;
    
    const content = document.createElement('div');
    content.className = 'element-content';
    
    const header = document.createElement('div');
    header.className = 'element-header';
    
    const title = document.createElement('div');
    title.className = 'element-title';
    title.contentEditable = true;
    title.textContent = component;
    
    const actions = document.createElement('div');
    actions.className = 'element-actions';
    
    const bringForwardBtn = document.createElement('button');
    bringForwardBtn.className = 'element-action';
    bringForwardBtn.innerHTML = '↑';
    bringForwardBtn.title = 'Bring Forward';
    bringForwardBtn.onclick = (e) => {
        e.stopPropagation();
        bringForward(element);
    };
    
    const sendBackwardBtn = document.createElement('button');
    sendBackwardBtn.className = 'element-action';
    sendBackwardBtn.innerHTML = '↓';
    sendBackwardBtn.title = 'Send Backward';
    sendBackwardBtn.onclick = (e) => {
        e.stopPropagation();
        sendBackward(element);
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'element-action';
    deleteBtn.innerHTML = '✕';
    deleteBtn.title = 'Delete';
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        deleteElement(element);
    };
    
    actions.appendChild(bringForwardBtn);
    actions.appendChild(sendBackwardBtn);
    actions.appendChild(deleteBtn);
    header.appendChild(title);
    header.appendChild(actions);
    
    const placeholder = createPlaceholder(type, component);
    content.appendChild(header);
    content.appendChild(placeholder);
    element.appendChild(content);
    
    // Add resize handles
    addResizeHandles(element);
    
    // Make draggable
    makeDraggable(element);
    
    // Click to select
    element.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement(element);
    });
    
    document.getElementById('canvasContent').appendChild(element);
    selectElement(element);
}

function createPlaceholder(type, component) {
    const placeholder = document.createElement('div');
    
    if (type === 'metric') {
        placeholder.className = 'metric-placeholder';
        const value = document.createElement('div');
        value.className = 'metric-value';
        value.textContent = '$0';
        const label = document.createElement('div');
        label.className = 'metric-label';
        label.textContent = component;
        placeholder.appendChild(value);
        placeholder.appendChild(label);
    } else if (type === 'chart') {
        placeholder.className = 'chart-placeholder';
        const icon = document.createElement('div');
        icon.className = 'chart-icon';
        icon.textContent = getChartIcon(component);
        const label = document.createElement('div');
        label.textContent = component;
        placeholder.appendChild(icon);
        placeholder.appendChild(label);
    } else if (type === 'filter') {
        placeholder.className = 'filter-placeholder';
        placeholder.innerHTML = `<span>${getFilterIcon(component)}</span><span>${component} Filter</span>`;
    } else if (type === 'layout') {
        placeholder.className = 'layout-placeholder';
        placeholder.textContent = component;
        if (component === 'Two Column') {
            placeholder.innerHTML = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%;"><div style="border: 1px dashed var(--border); padding: 16px;">Column 1</div><div style="border: 1px dashed var(--border); padding: 16px;">Column 2</div></div>';
        } else if (component === 'Three Column') {
            placeholder.innerHTML = '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%;"><div style="border: 1px dashed var(--border); padding: 16px;">Col 1</div><div style="border: 1px dashed var(--border); padding: 16px;">Col 2</div><div style="border: 1px dashed var(--border); padding: 16px;">Col 3</div></div>';
        } else if (component === 'Divider') {
            placeholder.style.borderTop = '2px solid var(--border)';
            placeholder.style.height = '2px';
            placeholder.style.padding = '0';
            placeholder.textContent = '';
        }
    }
    
    return placeholder;
}

function getChartIcon(component) {
    const icons = {
        'Line Chart': '📈',
        'Bar Chart': '📊',
        'Pie Chart': '🥧',
        'Area Chart': '📉',
        'Table': '📋',
        'KPI Card': '🎯',
        'Heatmap': '🔥',
        'Funnel Chart': '🔻'
    };
    return icons[component] || '📊';
}

function getFilterIcon(component) {
    const icons = {
        'Date Range': '📅',
        'Channel': '📺',
        'Country & Region': '🌍',
        'Device Type': '📱',
        'Product Category': '🏷️'
    };
    return icons[component] || '🔍';
}

// Make Element Draggable
function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    const header = element.querySelector('.element-header');
    header.style.cursor = 'move';
    
    header.addEventListener('mousedown', (e) => {
        if (e.target.contentEditable === 'true') return;
        isDragging = true;
        element.classList.add('dragging');
        selectElement(element);
        
        startX = e.clientX;
        startY = e.clientY;
        startLeft = parseInt(element.style.left) || 0;
        startTop = parseInt(element.style.top) || 0;
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        element.style.left = `${startLeft + deltaX}px`;
        element.style.top = `${startTop + deltaY}px`;
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            element.classList.remove('dragging');
            saveState();
        }
    });
}

// Resize Handles
function addResizeHandles(element) {
    const handles = ['se', 'ne', 'sw', 'nw'];
    handles.forEach(handle => {
        const handleEl = document.createElement('div');
        handleEl.className = `resize-handle ${handle}`;
        
        let isResizing = false;
        let startX, startY, startWidth, startHeight, startLeft, startTop;
        
        handleEl.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = element.offsetWidth;
            startHeight = element.offsetHeight;
            startLeft = parseInt(element.style.left) || 0;
            startTop = parseInt(element.style.top) || 0;
            e.stopPropagation();
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            if (handle.includes('e')) {
                element.style.width = `${Math.max(200, startWidth + deltaX)}px`;
            }
            if (handle.includes('s')) {
                element.style.height = `${Math.max(150, startHeight + deltaY)}px`;
            }
            if (handle.includes('w')) {
                const newWidth = Math.max(200, startWidth - deltaX);
                element.style.width = `${newWidth}px`;
                element.style.left = `${startLeft + (startWidth - newWidth)}px`;
            }
            if (handle.includes('n')) {
                const newHeight = Math.max(150, startHeight - deltaY);
                element.style.height = `${newHeight}px`;
                element.style.top = `${startTop + (startHeight - newHeight)}px`;
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                saveState();
            }
        });
        
        element.appendChild(handleEl);
    });
}

// Selection
function selectElement(element) {
    if (selectedElement) {
        selectedElement.classList.remove('selected');
    }
    selectedElement = element;
    element.classList.add('selected');
    showConfiguration(element);
}

function handleCanvasClick(e) {
    if (e.target.closest('.canvas-element')) return;
    if (selectedElement) {
        selectedElement.classList.remove('selected');
        selectedElement = null;
        showConfiguration(null);
    }
}

// Layer Ordering
function bringForward(element) {
    const parent = element.parentElement;
    const siblings = Array.from(parent.children).filter(child => child.classList.contains('canvas-element'));
    const currentIndex = siblings.indexOf(element);
    if (currentIndex < siblings.length - 1) {
        parent.insertBefore(element, siblings[currentIndex + 1].nextSibling);
        saveState();
    }
}

function sendBackward(element) {
    const parent = element.parentElement;
    const siblings = Array.from(parent.children).filter(child => child.classList.contains('canvas-element'));
    const currentIndex = siblings.indexOf(element);
    if (currentIndex > 0) {
        parent.insertBefore(element, siblings[currentIndex - 1]);
        saveState();
    }
}

// Delete Element
function deleteElement(element) {
    if (selectedElement === element) {
        selectedElement = null;
        showConfiguration(null);
    }
    element.remove();
    const canvasContent = document.getElementById('canvasContent');
    if (canvasContent.children.length === 0) {
        canvasContent.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📊</div><h2>Start Building Your Report</h2><p>Drag components from the left sidebar to begin</p></div>';
    }
    saveState();
}

// Configuration Panel
function showConfiguration(element) {
    const configContent = document.getElementById('configContent');
    
    if (!element) {
        configContent.innerHTML = `
            <div class="no-selection">
                <div class="no-selection-icon">⚙️</div>
                <p>Select a component to configure</p>
            </div>
        `;
        return;
    }
    
    const type = element.dataset.type;
    const component = element.dataset.component;
    
    let configHTML = '';
    
    if (type === 'metric') {
        configHTML = generateMetricConfig(element, component);
    } else if (type === 'chart') {
        configHTML = generateChartConfig(element, component);
    } else if (type === 'filter') {
        configHTML = generateFilterConfig(element, component);
    } else if (type === 'layout') {
        configHTML = generateLayoutConfig(element, component);
    }
    
    configContent.innerHTML = configHTML;
    attachConfigListeners(element);
}

function generateMetricConfig(element, component) {
    return `
        <div class="config-group">
            <div class="config-group-title">Metric Settings</div>
            <div class="config-field">
                <label class="config-label">Metric Type</label>
                <select class="config-select" data-config="metricType">
                    <option>Revenue</option>
                    <option>Orders</option>
                    <option>AOV</option>
                    <option>Conversion Rate</option>
                    <option>Returning Customer Rate</option>
                    <option>CAC</option>
                    <option>ROAS</option>
                    <option>CTR</option>
                    <option>Profit</option>
                </select>
            </div>
            <div class="config-field">
                <label class="config-label">Format</label>
                <select class="config-select" data-config="format">
                    <option value="currency">₹ Currency</option>
                    <option value="percentage">% Percentage</option>
                    <option value="number">Number</option>
                </select>
            </div>
            <div class="config-field">
                <label class="config-label">Decimal Places</label>
                <input type="number" class="config-input" data-config="decimals" value="2" min="0" max="10">
            </div>
            <div class="config-field">
                <label class="config-checkbox">
                    <input type="checkbox" data-config="showComparison">
                    <span>Show Comparison (WoW, MoM)</span>
                </label>
            </div>
            <div class="config-field">
                <label class="config-label">Color</label>
                <div class="color-picker">
                    <div class="color-option selected" style="background: #2563eb;" data-color="#2563eb"></div>
                    <div class="color-option" style="background: #10b981;" data-color="#10b981"></div>
                    <div class="color-option" style="background: #f59e0b;" data-color="#f59e0b"></div>
                    <div class="color-option" style="background: #ef4444;" data-color="#ef4444"></div>
                    <div class="color-option" style="background: #8b5cf6;" data-color="#8b5cf6"></div>
                    <div class="color-option" style="background: #06b6d4;" data-color="#06b6d4"></div>
                </div>
            </div>
        </div>
    `;
}

function generateChartConfig(element, component) {
    return `
        <div class="config-group">
            <div class="config-group-title">Chart Settings</div>
            <div class="config-field">
                <label class="config-label">Chart Type</label>
                <select class="config-select" data-config="chartType">
                    <option>Line Chart</option>
                    <option>Bar Chart</option>
                    <option>Pie Chart</option>
                    <option>Area Chart</option>
                    <option>Table</option>
                    <option>KPI Card</option>
                    <option>Heatmap</option>
                    <option>Funnel Chart</option>
                </select>
            </div>
            <div class="config-field">
                <label class="config-label">Select Metrics</label>
                <select class="config-select" data-config="metrics" multiple style="height: 100px;">
                    <option>Revenue</option>
                    <option>Orders</option>
                    <option>AOV</option>
                    <option>Conversion Rate</option>
                    <option>Profit</option>
                </select>
            </div>
            <div class="config-field">
                <label class="config-label">X-Axis</label>
                <select class="config-select" data-config="xAxis">
                    <option>Date</option>
                    <option>Channel</option>
                    <option>Country</option>
                    <option>Product Category</option>
                </select>
            </div>
            <div class="config-field">
                <label class="config-label">Y-Axis</label>
                <select class="config-select" data-config="yAxis">
                    <option>Revenue</option>
                    <option>Orders</option>
                    <option>Conversion Rate</option>
                </select>
            </div>
            <div class="config-field">
                <label class="config-label">Date Range</label>
                <select class="config-select" data-config="dateRange">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last year</option>
                </select>
            </div>
            <div class="config-field">
                <label class="config-checkbox">
                    <input type="checkbox" data-config="showLegend" checked>
                    <span>Show Legend</span>
                </label>
            </div>
            <div class="config-field">
                <label class="config-label">Color Theme</label>
                <select class="config-select" data-config="colorTheme">
                    <option>Default Blue</option>
                    <option>Green</option>
                    <option>Orange</option>
                    <option>Purple</option>
                    <option>Red</option>
                </select>
            </div>
        </div>
    `;
}

function generateFilterConfig(element, component) {
    return `
        <div class="config-group">
            <div class="config-group-title">Filter Settings</div>
            <div class="config-field">
                <label class="config-label">Filter Type</label>
                <select class="config-select" data-config="filterType">
                    <option>Date Range</option>
                    <option>Channel</option>
                    <option>Country & Region</option>
                    <option>Device Type</option>
                    <option>Product Category</option>
                </select>
            </div>
            <div class="config-field">
                <label class="config-label">Default Value</label>
                <input type="text" class="config-input" data-config="defaultValue" placeholder="Enter default value">
            </div>
            <div class="config-field">
                <label class="config-checkbox">
                    <input type="checkbox" data-config="allowMultiSelect">
                    <span>Allow Multi-Select</span>
                </label>
            </div>
            <div class="config-field">
                <label class="config-checkbox">
                    <input type="checkbox" data-config="chainFilters">
                    <span>Chain with Other Filters</span>
                </label>
            </div>
        </div>
    `;
}

function generateLayoutConfig(element, component) {
    return `
        <div class="config-group">
            <div class="config-group-title">Layout Settings</div>
            <div class="config-field">
                <label class="config-label">Grid Spacing</label>
                <input type="number" class="config-input" data-config="gridSpacing" value="16" min="0" max="50">
            </div>
            <div class="config-field">
                <label class="config-label">Background Color</label>
                <input type="color" class="config-input" data-config="backgroundColor" value="#ffffff">
            </div>
            <div class="config-field">
                <label class="config-label">Border Radius</label>
                <input type="number" class="config-input" data-config="borderRadius" value="8" min="0" max="20">
            </div>
            <div class="config-field">
                <label class="config-label">Padding</label>
                <input type="number" class="config-input" data-config="padding" value="16" min="0" max="50">
            </div>
        </div>
    `;
}

function attachConfigListeners(element) {
    const inputs = document.querySelectorAll('[data-config]');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.addEventListener('change', () => updateElementConfig(element));
        } else {
            input.addEventListener('input', () => updateElementConfig(element));
        }
    });
    
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            updateElementConfig(element);
        });
    });
}

function updateElementConfig(element) {
    // Update element based on configuration
    const configs = document.querySelectorAll('[data-config]');
    configs.forEach(config => {
        const key = config.dataset.config;
        // Store configuration in element dataset
        if (config.type === 'checkbox') {
            element.dataset[key] = config.checked;
        } else if (config.classList.contains('color-option') && config.classList.contains('selected')) {
            element.dataset.color = config.dataset.color;
        } else {
            element.dataset[key] = config.value;
        }
    });
    saveState();
}

// Collapsible Sections
function initializeCollapsibleSections() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('collapsed');
        });
    });
}

// Header Actions
function initializeHeaderActions() {
    document.getElementById('newReport').addEventListener('click', () => {
        if (confirm('Create a new report? All unsaved changes will be lost.')) {
            document.getElementById('canvasContent').innerHTML = '<div class="empty-state"><div class="empty-state-icon">📊</div><h2>Start Building Your Report</h2><p>Drag components from the left sidebar to begin</p></div>';
            selectedElement = null;
            showConfiguration(null);
            history = [];
            historyIndex = -1;
            saveState();
        }
    });
    
    document.getElementById('undoBtn').addEventListener('click', undo);
    document.getElementById('redoBtn').addEventListener('click', redo);
    document.getElementById('saveBtn').addEventListener('click', saveReport);
    document.getElementById('saveAsTemplateBtn').addEventListener('click', saveAsTemplate);
    document.getElementById('previewBtn').addEventListener('click', showPreview);
    document.getElementById('exportBtn').addEventListener('click', exportReport);
    document.getElementById('shareBtn').addEventListener('click', shareReport);
    document.getElementById('closeConfigBtn').addEventListener('click', () => {
        document.querySelector('.sidebar-right').style.display = 'none';
    });
}

// History Management
function saveState() {
    const canvasContent = document.getElementById('canvasContent');
    const state = {
        html: canvasContent.innerHTML,
        timestamp: Date.now()
    };
    
    // Remove future states if we're in the middle of history
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    
    history.push(state);
    historyIndex = history.length - 1;
    
    // Limit history size
    if (history.length > 50) {
        history.shift();
        historyIndex--;
    }
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        restoreState(history[historyIndex]);
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        restoreState(history[historyIndex]);
    }
}

function restoreState(state) {
    const canvasContent = document.getElementById('canvasContent');
    canvasContent.innerHTML = state.html;
    
    // Reattach event listeners
    document.querySelectorAll('.canvas-element').forEach(element => {
        makeDraggable(element);
        addResizeHandles(element);
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            selectElement(element);
        });
    });
}

// Preview Mode
function showPreview() {
    const modal = document.getElementById('previewModal');
    const previewContent = document.getElementById('previewContent');
    const canvasContent = document.getElementById('canvasContent').cloneNode(true);
    
    // Remove interactive elements
    canvasContent.querySelectorAll('.element-actions').forEach(el => el.remove());
    canvasContent.querySelectorAll('.resize-handle').forEach(el => el.remove());
    canvasContent.querySelectorAll('.canvas-element').forEach(el => {
        el.classList.remove('selected');
        el.style.position = 'relative';
        el.style.marginBottom = '24px';
    });
    
    previewContent.innerHTML = '<div class="preview-content">' + canvasContent.innerHTML + '</div>';
    modal.classList.add('active');
    
    document.getElementById('closePreviewBtn').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Save & Export
function saveReport() {
    const canvasContent = document.getElementById('canvasContent');
    const report = {
        elements: Array.from(canvasContent.querySelectorAll('.canvas-element')).map(el => ({
            id: el.id,
            type: el.dataset.type,
            component: el.dataset.component,
            left: el.style.left,
            top: el.style.top,
            width: el.style.width,
            height: el.style.height,
            data: Array.from(el.attributes).reduce((acc, attr) => {
                if (attr.name.startsWith('data-')) {
                    acc[attr.name] = attr.value;
                }
                return acc;
            }, {})
        })),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('savedReport', JSON.stringify(report));
    alert('Report saved successfully!');
}

function saveAsTemplate() {
    const name = prompt('Enter template name:');
    if (name) {
        const canvasContent = document.getElementById('canvasContent');
        const template = {
            name,
            elements: Array.from(canvasContent.querySelectorAll('.canvas-element')).map(el => ({
                type: el.dataset.type,
                component: el.dataset.component,
                left: el.style.left,
                top: el.style.top,
                width: el.style.width,
                height: el.style.height
            })),
            timestamp: new Date().toISOString()
        };
        
        const templates = JSON.parse(localStorage.getItem('templates') || '[]');
        templates.push(template);
        localStorage.setItem('templates', JSON.stringify(templates));
        alert(`Template "${name}" saved successfully!`);
    }
}

function exportReport() {
    const format = prompt('Export as (PDF/PNG):', 'PDF').toUpperCase();
    if (format === 'PDF' || format === 'PNG') {
        alert(`${format} export functionality would be implemented here.`);
        // In a real implementation, you would use libraries like jsPDF or html2canvas
    }
}

function shareReport() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'Report Builder',
            text: 'Check out this report!',
            url: url
        });
    } else {
        navigator.clipboard.writeText(url);
        alert('Report link copied to clipboard!');
    }
}

// Canvas
function initializeCanvas() {
    // Canvas initialization if needed
}

