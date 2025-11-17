# Figma Design Specification: No-Code Report Builder

## Overview
This document provides detailed specifications for creating the no-code report builder interface in Figma, including component specifications, interaction design, and styling guidelines.

---

## 1. Design System

### Color Palette
- **Primary Color**: Blue (#2563eb)
- **Primary Hover**: Dark Blue (#1d4ed8)
- **Secondary Color**: Gray (#64748b)
- **Background**: Light Gray (#f8fafc)
- **Surface**: White (#ffffff)
- **Border**: Light Gray (#e2e8f0)
- **Text Primary**: Dark Gray (#0f172a)
- **Text Secondary**: Medium Gray (#475569)

### Typography
- **Font Family**: Inter
- **Logo**: 20px, Weight 600
- **Headers**: 16px, Weight 600
- **Body Text**: 14px, Weight 400
- **Labels**: 13px, Weight 500
- **Small Text**: 12px, Weight 400

### Spacing
- Base unit: 8px
- Component spacing: 8px grid
- Padding: 16px, 20px, 24px
- Gap between elements: 8px, 12px, 16px

### Border Radius
- Standard: 8px
- Buttons: 8px
- Components: 8px
- Cards: 8px

### Shadows
- **Small**: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
- **Medium**: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)
- **Large**: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)

---

## 2. Layout Structure

### Header (Top Bar)
- **Height**: 64px
- **Background**: White (#ffffff)
- **Border**: Bottom border 1px solid #e2e8f0
- **Shadow**: Small shadow

**Left Section:**
- Logo: "📊 Report Builder" (20px, weight 600)

**Right Section - Action Buttons:**
- New Report (Icon: 📄)
- Undo (Icon: ↶)
- Redo (Icon: ↷)
- Save (Icon: 💾)
- Save As Template (Icon: 📋)
- Preview (Icon: 👁️) - Primary button style
- Export (Icon: 📥)
- Share (Icon: 🔗)

**Button Specifications:**
- Height: 36px
- Padding: 8px 16px
- Border radius: 8px
- Gap between icon and text: 6px
- Icon size: 16px

### Left Sidebar (Components Panel)
- **Width**: 280px
- **Background**: White (#ffffff)
- **Border**: Right border 1px solid #e2e8f0
- **Scrollable**: Yes

**Section Headers:**
- Height: 44px
- Padding: 12px 20px
- Icon size: 18px
- Expand icon: ▼ (12px, rotates on collapse)

**Component Items:**
- Layout: 2-column grid
- Item size: ~130px width
- Padding: 12px
- Gap: 8px
- Border: 1px solid #e2e8f0
- Border radius: 8px
- Icon: 24px
- Text: 12px, centered

### Main Canvas (Center)
- **Background**: Light gray (#e2e8f0)
- **Grid Pattern**: 
  - Lines: rgba(0,0,0,0.03)
  - Grid size: 20px × 20px
- **Padding**: 40px
- **Scrollable**: Yes

**Canvas Elements:**
- Border: 2px solid transparent (changes to blue on hover/select)
- Border radius: 8px
- Background: White (#ffffff)
- Shadow: Medium shadow
- Min width: 200px
- Min height: 150px

**Element Header:**
- Height: Auto
- Padding: 16px
- Border bottom: 1px solid #e2e8f0
- Title: Editable, 14px, weight 600
- Actions: ↑, ↓, ✕ icons

**Resize Handles:**
- Size: 12px × 12px
- Background: Primary blue (#2563eb)
- Border: 2px white
- Border radius: 50%
- Positions: SE, NE, SW, NW corners

### Right Sidebar (Configuration Panel)
- **Width**: 280px
- **Background**: White (#ffffff)
- **Border**: Left border 1px solid #e2e8f0
- **Scrollable**: Yes

**Header:**
- Title: "Configuration" (16px, weight 600)
- Close button: ✕ (20px)

**Content Sections:**
- Group title: 14px, weight 600, margin bottom 12px
- Field spacing: 16px between fields
- Label: 13px, weight 500, margin bottom 6px

**Input Fields:**
- Height: 36px
- Padding: 8px 12px
- Border: 1px solid #e2e8f0
- Border radius: 8px
- Focus: Blue border with subtle shadow

**Color Picker:**
- Swatch size: 32px × 32px
- Gap: 8px
- Border radius: 8px
- Border: 2px solid #e2e8f0
- Selected state: Blue border with shadow

---

## 3. Component Specifications

### A. Metrics
**Component Items (Left Panel):**
1. Revenue (💰)
2. Orders (📦)
3. AOV (💵)
4. Conversion Rate (🎯)
5. Returning Customer Rate (🔄)
6. CAC (💸)
7. ROAS (📊)
8. CTR (👆)
9. Profit (💎)

**Canvas Placeholder:**
- Large number: 32px, weight 700, primary blue
- Label: 14px, secondary gray
- Centered alignment

**Configuration Options:**
- Metric Type: Dropdown
- Format: Dropdown (₹ Currency, % Percentage, Number)
- Decimal Places: Number input (0-10)
- Show Comparison: Checkbox
- Color: Color picker (6 options)

### B. Visualizations
**Component Items (Left Panel):**
1. Line Chart (📈)
2. Bar Chart (📊)
3. Pie Chart (🥧)
4. Area Chart (📉)
5. Table (📋)
6. KPI Card (🎯)
7. Heatmap (🔥)
8. Funnel Chart (🔻)

**Canvas Placeholder:**
- Large icon: 48px, 50% opacity
- Chart type label: 14px, centered

**Configuration Options:**
- Chart Type: Dropdown
- Select Metrics: Multi-select dropdown
- X-Axis: Dropdown (Date, Channel, Country, Product Category)
- Y-Axis: Dropdown
- Date Range: Dropdown (Last 7/30/90 days, Last year)
- Show Legend: Checkbox
- Color Theme: Dropdown (Default Blue, Green, Orange, Purple, Red)

### C. Filters
**Component Items (Left Panel):**
1. Date Range (📅)
2. Channel (📺)
3. Country & Region (🌍)
4. Device Type (📱)
5. Product Category (🏷️)

**Canvas Placeholder:**
- Icon + Label format
- Horizontal layout
- Padding: 16px

**Configuration Options:**
- Filter Type: Dropdown
- Default Value: Text input
- Allow Multi-Select: Checkbox
- Chain with Other Filters: Checkbox

### D. Layout Blocks
**Component Items (Left Panel):**
1. Section Block (▦)
2. Two Column (▭)
3. Three Column (▱)
4. Header Text (H1)
5. Subheader Text (H2)
6. Divider Line (─)
7. Empty Container (☐)

**Canvas Placeholder:**
- Dashed border container
- Layout-specific visualizations
- Divider: 2px horizontal line

**Configuration Options:**
- Grid Spacing: Number input (0-50px)
- Background Color: Color picker
- Border Radius: Number input (0-20px)
- Padding: Number input (0-50px)

---

## 4. Interaction Prototypes

### Drag & Drop
1. **Drag Start:**
   - Component item opacity: 50%
   - Cursor: Grabbing
   - Visual feedback on dragged item

2. **Drag Over Canvas:**
   - Cursor: Copy icon
   - Grid highlighting (optional)

3. **Drop:**
   - Element appears at drop location
   - Element auto-selected
   - Configuration panel opens

### Selection
1. **Click Element:**
   - Border: 2px solid primary blue
   - Shadow: 0 0 0 3px rgba(37, 99, 235, 0.1)
   - Configuration panel updates

2. **Click Canvas:**
   - Deselect all elements
   - Configuration panel shows "Select a component" message

### Resizing
1. **Hover Resize Handle:**
   - Cursor changes to resize icon (↖↗↙↘)
   - Handle slightly enlarges

2. **Drag Resize:**
   - Element dimensions update in real-time
   - Minimum size constraints visible

### Layer Ordering
1. **Bring Forward (↑):**
   - Element moves up one layer
   - Smooth transition

2. **Send Backward (↓):**
   - Element moves down one layer
   - Smooth transition

### Preview Mode
1. **Click Preview:**
   - Modal overlay appears
   - Full-screen preview
   - Interactive elements removed
   - Close button in header

2. **Preview Content:**
   - Elements stacked vertically
   - No borders/controls visible
   - Clean report layout

### Configuration
1. **Input Changes:**
   - Real-time updates (if possible in prototype)
   - Or update on blur/change event

2. **Color Selection:**
   - Selected color highlighted
   - Visual feedback

---

## 5. Figma Implementation Guide

### Component Organization
1. **Master Components:**
   - Create components for reusable elements
   - Button variants (Primary, Secondary)
   - Input fields
   - Component items
   - Canvas elements

2. **Variants:**
   - Use Figma Variants for component states
   - Button states: Default, Hover, Active
   - Element states: Default, Hover, Selected
   - Configuration panel: Empty, With Content

3. **Auto Layout:**
   - Use Auto Layout for all panels
   - Header buttons: Horizontal auto layout
   - Component list: Grid (2 columns)
   - Configuration fields: Vertical auto layout

4. **Frames:**
   - Main frame: 1440px × 900px (or larger)
   - Sidebars: Fixed width (280px)
   - Canvas: Flexible width

### Prototyping Connections
1. **Drag Interactions:**
   - Use Figma's Drag trigger for component items
   - Connect to canvas frame
   - Set destination: Canvas area

2. **Click Interactions:**
   - Elements → Select state
   - Buttons → Navigate to corresponding screens
   - Preview button → Open preview modal

3. **Smart Animate:**
   - Use for smooth transitions
   - Configuration panel open/close
   - Element selection
   - Preview modal appearance

### States & Interactions
1. **Component Sections:**
   - Collapsed/Expanded states
   - Use Figma Variants or separate frames

2. **Canvas Elements:**
   - Default state
   - Hover state (blue border)
   - Selected state (blue border + shadow)
   - Dragging state (opacity 70%)

3. **Configuration Panel:**
   - No selection state (icon + text)
   - Configuration state (form fields)

---

## 6. Screen Deliverables

### Required Screens
1. **Main Dashboard:**
   - Blank canvas state
   - All sidebars visible
   - Header with all buttons

2. **With Elements:**
   - Canvas with 2-3 sample elements
   - One element selected
   - Configuration panel showing settings

3. **Preview Mode:**
   - Full-screen preview
   - Clean report layout
   - Close button visible

4. **Component Variants:**
   - All metric placeholders
   - All chart placeholders
   - All filter placeholders
   - All layout block placeholders

---

## 7. Design Notes

### Visual Hierarchy
- Primary actions (Preview) use primary blue
- Secondary actions use gray
- Important information uses dark text
- Secondary information uses medium gray

### Accessibility
- Ensure sufficient color contrast (WCAG AA)
- Interactive elements minimum 44×44px
- Clear focus states
- Descriptive labels

### Responsive Considerations
- Sidebar can collapse on smaller screens
- Canvas maintains minimum usable width
- Action buttons can wrap or use dropdown menu

---

## 8. Prototype Flow

1. **Start**: Blank canvas → User drags component
2. **Build**: Component appears → User configures
3. **Select**: User clicks element → Configuration opens
4. **Configure**: User changes settings → Element updates
5. **Preview**: User clicks Preview → Modal opens
6. **Save**: User clicks Save → Confirmation

---

This specification provides everything needed to recreate the interface in Figma with full interactivity and design consistency.

