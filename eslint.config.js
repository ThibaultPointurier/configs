import { tpointurier } from "./dist";

export default tpointurier({
    vue: true,
    typescript: {
        typeAwareRules: false,
    },
    ignores: ['test.ts'],
})