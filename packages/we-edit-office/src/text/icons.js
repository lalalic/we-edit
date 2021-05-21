import React from "react";
import { SvgIcon } from "material-ui";

export const IconSuperscript = props => (
	<SvgIcon {...props}>
		<g transform="translate(0 3) scale(0.7)">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
		</g>
		<text x="15" y="9" style={{ fontSize: 9 }}>2</text>
	</SvgIcon>
);
export const IconSubscript = props => (
	<SvgIcon {...props}>
		<g transform="translate(0 3) scale(0.7)">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
		</g>
		<text x="15" y="20" style={{ fontSize: 9 }}>2</text>
	</SvgIcon>
);
export const IconBigger = props => (
	<SvgIcon {...props}>
		<g transform="translate(0 2)">
			<path d="M5 17m4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z" />
		</g>
		<g transform="translate(18 2)">
			<path d="M0 3H6L3 0z" />
		</g>
	</SvgIcon>
);
export const IconSmaller = props => (
	<SvgIcon {...props}>
		<g transform="translate(0 2)">
			<path d="M5 17m4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z" />
		</g>
		<g transform="translate(18 2)">
			<path d="M0 0 H6L3 3z" />
		</g>
	</SvgIcon>
);
export const IconTextBorder = props => (
	<SvgIcon {...props}>
		<g transform="translate(0 2)">
			<path d="M5 17m4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z" />
		</g>
		<path d="M2 2 h20v20h-20z" fill="none" stroke="black" />
	</SvgIcon>
);
