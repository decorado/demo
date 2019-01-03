# Writing styles Best Practices

## Don't style components using the global `style.css`

It is very bad to write css in the global file because you end up applying styles in components that you do not want to. It can be very dangerous and ends up messing all the organization.

## Stick to `Emulated` ViewEncapsulation

Avoid changing the encapsuation. When you change it, you can end up with a lot of conflicts and the styling becomes very hard.

##
