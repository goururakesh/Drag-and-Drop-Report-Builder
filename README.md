# No-Code Report Builder - Interactive Prototype

An interactive HTML/CSS/JavaScript prototype of a no-code report builder interface designed for Figma implementation.

## 🚀 Quick Start

1. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)
2. Start dragging components from the left sidebar onto the canvas
3. Click on canvas elements to configure them in the right panel
4. Use the header buttons for preview, save, and export functionality

## 📁 Files

- **index.html** - Main HTML structure with all UI components
- **styles.css** - Complete styling with design system (colors, typography, spacing)
- **script.js** - Full JavaScript functionality (drag-and-drop, configuration, preview)
- **FIGMA_DESIGN_SPEC.md** - Detailed Figma design specification document

## ✨ Features Implemented

### Left Sidebar - Components Panel
- **Metrics**: Revenue, Orders, AOV, Conversion Rate, Returning Customer Rate, CAC, ROAS, CTR, Profit
- **Visualizations**: Line Chart, Bar Chart, Pie Chart, Area Chart, Table, KPI Card, Heatmap, Funnel Chart
- **Filters**: Date Range, Channel, Country & Region, Device Type, Product Category
- **Layout Blocks**: Section Block, Two Column, Three Column, Header Text, Subheader Text, Divider Line, Empty Container
- Collapsible sections for better organization

### Main Canvas
- Grid background for alignment
- Drag and drop components
- Resizable elements (4 corner handles)
- Selectable elements (click to select)
- Layer ordering (bring forward/backward)
- Editable titles
- Delete functionality

### Right Sidebar - Configuration Panel
- **Metric Configuration**: Type, format (₹, %, number), decimal places, comparison toggle, color picker
- **Chart Configuration**: Chart type, metrics selection, X/Y axes, date range, legend toggle, color theme
- **Filter Configuration**: Filter type, default value, multi-select, chain filters
- **Layout Configuration**: Grid spacing, background color, border radius, padding

### Header Actions
- **New Report**: Clear canvas and start fresh
- **Undo/Redo**: History management (50 steps)
- **Save**: Save report to browser localStorage
- **Save As Template**: Save current layout as reusable template
- **Preview**: Full-screen preview mode (modal)
- **Export**: Export functionality placeholder (PDF/PNG)
- **Share**: Share functionality (clipboard or native share API)

## 🎨 Design System

### Colors
- Primary: Blue (#2563eb)
- Background: Light Gray (#f8fafc)
- Surface: White (#ffffff)
- Text: Dark Gray (#0f172a)

### Typography
- Font: Inter (Google Fonts)
- Consistent sizing and weights throughout

### Spacing
- 8px base grid system
- Consistent padding and margins

## 🖱️ Interactions

1. **Drag Components**: Click and drag from left sidebar to canvas
2. **Move Elements**: Click and drag the header of canvas elements
3. **Resize**: Use corner handles on selected elements
4. **Configure**: Click any element to open configuration panel
5. **Delete**: Click ✕ button on element header
6. **Layer Order**: Use ↑ and ↓ buttons to change stacking order
7. **Preview**: Click Preview button to see full-screen report

## 📊 Use Cases

### Building a Report
1. Drag a layout block (e.g., Two Column) to the canvas
2. Add metrics to each column
3. Add charts to visualize data
4. Add filters at the top
5. Configure each component using the right panel
6. Preview your report
7. Save or export

### Example Report Structure
```
┌─────────────────────────────────┐
│ Date Range Filter              │
├─────────────────────────────────┤
│ ┌──────────┐  ┌──────────┐     │
│ │ Revenue  │  │  Orders  │     │
│ └──────────┘  └──────────┘     │
├─────────────────────────────────┤
│ Line Chart: Revenue Over Time  │
├─────────────────────────────────┤
│ Bar Chart: Orders by Channel   │
└─────────────────────────────────┘
```

## 🎯 For Figma Implementation

Refer to **FIGMA_DESIGN_SPEC.md** for:
- Complete design specifications
- Component specifications
- Color palette and typography
- Interaction prototypes
- Figma implementation guidelines
- Component organization recommendations

## 🔧 Technical Details

### Browser Compatibility
- Modern browsers with ES6+ support
- Uses HTML5 Drag and Drop API
- Uses localStorage for saving reports

### Future Enhancements
- Actual chart rendering with Chart.js or similar
- Real data integration
- PDF/PNG export with libraries (jsPDF, html2canvas)
- Multi-user collaboration
- Template marketplace

## 📝 Notes

- This is a functional prototype demonstrating UI/UX patterns
- Configuration changes are saved to element data attributes
- Reports are saved to browser localStorage (not persistent across browsers/devices)
- Preview mode shows a clean version without interactive elements

## 🎨 Design Principles

1. **Clean SaaS-style UI**: Minimal, professional interface
2. **Light Background**: Easy on the eyes for long sessions
3. **Blue/Gray Accents**: Modern, trustworthy color scheme
4. **Rounded Components**: 8px radius for friendly feel
5. **Consistent Spacing**: 8px grid system throughout
6. **Clear Visual Hierarchy**: Primary actions stand out

---

**Ready to build your reports!** 🚀

Drag components from the left, configure them on the right, and preview your results!

