import clsx from "clsx";

type Arguments<T extends object> = boolean | keyof T | Omit<keyof T, string> | Record<keyof T, boolean> | (keyof T | boolean)[] | Arguments<T>[];

type MakeStyleFn = <T extends Record<string, any>>(obj: T) => (...args: Arguments<T>[]) => any;
export const createStyles: MakeStyleFn = <T extends object>(styles: T) => {
    const orderMap = new Map<string, number>(Object.keys(styles).map((key, index) => [key, index]));
    return (...classes: Arguments<T>[]) => {
        //@ts-ignore
        const finalclasses = clsx(...classes);
        let finalStyle = {};
        finalclasses.split(" ").sort((classA, classB) => {
            const a = orderMap.get(classA) ?? 0;
            const b = orderMap.get(classB) ?? 0;
            return a - b;
        }).forEach(finalClass => {
            finalStyle = {
                ...finalStyle,
                ...(styles as any)[finalClass],
            };
        });
        return finalStyle;
    };
};