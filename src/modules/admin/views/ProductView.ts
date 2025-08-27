import { useFieldArray, useForm } from 'vee-validate';
import * as yup from 'yup';
import { getProductById } from '@/modules/products/actions/get-product-by-id.action';
import { useQuery } from '@tanstack/vue-query';
import { defineComponent, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';

// https://vee-validate.logaretm.com/v4/guide/composition-api/getting-started/
// https://zod.dev/
// https://www.npmjs.com/package/yup

const schemaForm = yup.object({
  title: yup
    .string()
    .required('Campo muy necesario')
    .min(3, 'Muy corto, se necesitan al menos 3 caracteres')
    .max(100, 'Muy largo, solo hasta 100 caracteres'),
  price: yup.number().required(),
  description: yup.string().required(),
  slug: yup.string().required(),
  stock: yup.number().required().min(1).max(1000),
  gender: yup.string().required().oneOf(['men', 'women', 'kid', 'unisex']),
});

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
  },
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

    const { values, errors, defineField, handleSubmit, resetForm, meta } = useForm({
      validationSchema: schemaForm,
    });

    const [title, titleAttrs] = defineField('title');
    const [price, priceAttrs] = defineField('price');
    const [description, descriptionAttrs] = defineField('description');
    const [slug, slugAttrs] = defineField('slug');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: imagesField } = useFieldArray<string>('images');
    const {
      fields: sizesField,
      remove: removeSize,
      push: addSize,
    } = useFieldArray<string>('sizes');

    const onSubmit = handleSubmit((values) => {
      console.log(values);
    });

    const hasSize = (size: string) => {
      const currentSizes = sizesField.value.map((item) => item.value);
      return {
        hasSize: currentSizes.includes(size),
        index: currentSizes.indexOf(size),
      };
    };

    const toggleSize = (size: string) => {
      const data = hasSize(size);
      if (data.hasSize) {
        removeSize(data.index);
      } else {
        addSize(size);
      }
    };

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace({ name: 'admin-products' });
        return;
      }
    });

    watch(
      product,
      (product) => {
        if (product) {
          resetForm({ values: product });
        }
      },
      { deep: true, immediate: true },
    );

    return {
      // properties
      product,
      values,
      errors,
      meta,

      title,
      titleAttrs,
      price,
      priceAttrs,
      description,
      descriptionAttrs,
      slug,
      slugAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      imagesField,
      sizesField,

      // getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

      // actions
      onSubmit,
      toggleSize,
      hasSize,
    };
  },
});
