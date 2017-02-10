// Positioning Functionality

interface RegisteredObject extends Object {
	Primary: Element;
	Secondary: HTMLElement;
	HorizontalPos: string;
	VerticalPos: string;
}

namespace solbit.position {
	export var registered: RegisteredObject[] = []; // Array of Objects

	// Top
	// This function will position the secondary Element specified above the first
	export function Top(primaryElement: Element, secondaryElement: HTMLElement): void {
		let primaryElementDimensions: ClientRect = primaryElement.getClientRects()[0]; // Get the ClientRect Object of the primaryElement
		let secondaryElementDimensions: ClientRect = secondaryElement.getClientRects()[0]; // Get the ClientRect Object of the secondaryElement

		secondaryElement.style.top = (primaryElementDimensions.top - secondaryElementDimensions.height).toString() + "px"; // Set the top position of secondaryElement to top edge Y coordinate of primaryElement minus height of secondaryElement
	}

	// Bottom
	// This function will position the secondary Element specified below the first
	export function Bottom(primaryElement: Element, secondaryElement: HTMLElement): void {
		let primaryElementDimensions: ClientRect = primaryElement.getClientRects()[0]; // Get the ClientRect Object of the primaryElement
		secondaryElement.style.bottom = primaryElementDimensions.bottom.toString() + "px"; // primaryElementDimensions.bottom
	}

	// Center
	// This function will position the secondary Element centered respective to the first
	export function Center(primaryElement: Element, secondaryElement: HTMLElement): void {
		let primaryElementDimensions: ClientRect = primaryElement.getClientRects()[0]; // Get the ClientRect Object of the primaryElement
		let secondaryElementDimensions: ClientRect = secondaryElement.getClientRects()[0]; // Get the ClientRect Object of the secondaryElement
		let primaryElementWidth: number = primaryElementDimensions.width;
		let secondaryElementWidth: number = secondaryElementDimensions.width;

		let secondaryElementX: number; // Define secondaryElementX as the x position we'll set secondaryElement to

		if (primaryElementWidth > secondaryElementWidth) { // If the primaryElement is wider than the secondaryElement
			secondaryElementX = primaryElementDimensions.left + ((primaryElementWidth - secondaryElementWidth) / 2);
		} else {
			secondaryElementX = primaryElementDimensions.left - ((secondaryElementWidth - primaryElementWidth) / 2);
		}

		secondaryElement.style.left = secondaryElementX.toString() + "px";
	}

	// Register
	// This function will register the requested positioning, primary, and secondary Elements for Update.
	export function Register(positions: string[], primaryElement: Element, secondaryElement: HTMLElement): void {
		let registeredObject: RegisteredObject = { HorizontalPos: positions[0], VerticalPos: positions[0], Primary: primaryElement, Secondary: secondaryElement };
		solbit.position.registered.push(registeredObject); // Add the registeredObject
	}

	// Update
	// This function will update positions of Elements
	export function Update(): void {
		for (let registeredObject of solbit.position.registered) { // For each registeredObject
			// Horizontal Positioning
			if (registeredObject.HorizontalPos == "top") { // Top
				solbit.position.Top(registeredObject.Primary, registeredObject.Secondary);
			} else { // Bottom
				solbit.position.Bottom(registeredObject.Primary, registeredObject.Secondary);
			}

			// Vertical Positioning
			if (registeredObject.VerticalPos == "center") { // Center
				solbit.position.Center(registeredObject.Primary, registeredObject.Secondary);
			}
		}
	}
}