import { getProductById } from '@/modules/products/actions/get-product-by-id.action';
import { useQuery } from '@tanstack/vue-query';
import { defineComponent, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // console.log(`props.productId: ${props.productId}`);
    const router = useRouter();

    const {
      data: product,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['products', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace({ name: 'admin-products' });
        return;
      }
    });

    return {
      // properties
      product,
      // getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

      // actions
    };
  },
});
