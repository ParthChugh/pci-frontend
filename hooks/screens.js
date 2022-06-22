import { createMedia } from "@artsy/fresnel"

const breakpoints = {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1365
};

const ExampleAppMedia = createMedia({ breakpoints })

export const mediaStyle = ExampleAppMedia.createMediaStyle()
export const { Media, MediaContextProvider } = ExampleAppMedia