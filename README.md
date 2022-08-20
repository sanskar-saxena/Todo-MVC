# Getting Started with Create React App

Built a todo MVP app from scratch, exactly similar to [this one](https://todomvc.com/examples/react/#/) both from a functionality and UI point of view

### Functionality

1. Items can be created by pressing Enter from the main input field.
2. Items can be marked complete.
3. Items can be deleted.
4. Input field shows up with the text of the item when the item is double-clicked.
5. Any changes made to the input field from the previous point are saved when Enter is pressed.
6. When an item is in edit mode and user clicked on other item, the older item should become ineditable mode.
7. Only Single item should remain in edit mode in any case
8. When editing and the text is empty, handle the case as per the actual website

### Styling

1. The main input field, along with the item rows should be centered and should take 85% of the screen’s width with a
   max-width of 500px.
2. The item middle section with the text should take up the entire width of the row minus the circle and “x”.
3. The item rows should have non-overlapping borders.
4. The circle should be empty if the item is not complete and the circle should contain “✓” + the text should be
   stricken-through if the item is complete.
5. The “x” should only show if the row is being hovered.
6. The text should wrap along with the row and not overflow.

### Follow Architecture

1. Proper use of React. React code follows a reasonable component structure.
2. There are no errors. There are no warnings that resulted from not following the best practices listed in the
   documentation, such as using keys for list items.
3. complete/remove two items with the same value. The action should only apply to the item you clicked.
4. <form> with onSubmit is used for creating/editing items instead of onKeyPress/onKeyDown.

### Advanced Items

1. When an item is being edited, hovering on it should not bring up the “X” (delete) and Circle (complete) buttons
2. While editing an item, clearing the entire text and pressing Enter should remove the item
3. While editing an item, blurring out of the field will also save..... (update)
4. Pressing "esc" at any point of editing should revert any changes to the list item (back to what it was already).