import { useFieldArray, useForm } from 'vee-validate';
import * as yup from 'yup';
import { getProductById } from '@/modules/products/actions/get-product-by-id.action';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { defineComponent, watch, watchEffect, ref } from 'vue';
import { useRouter } from 'vue-router';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { createUpdateProductAction } from '@/modules/products/actions';
import { useToast } from 'vue-toastification';

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
    const toast = useToast();

    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['products', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    const {
      isPending,
      isSuccess: isUpdateSuccess,
      data: updateProduct,
      mutate: createUpdateProduct,
    } = useMutation({
      mutationFn: createUpdateProductAction,
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

    const imageFiles = ref<File[]>([]);

    const onSubmit = handleSubmit(async (values) => {
      // console.log(values);
      const formProduct = {
        ...values,
        images: [...values.images, ...imageFiles.value],
      };
      createUpdateProduct(formProduct);
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

    const onFileChanged = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;

      if (!files) return;
      if (files.length === 0) return;

      for (const file of files) {
        imageFiles.value.push(file);
      }
    };

    const temporalImageURI = (image: File) => {
      return URL.createObjectURL(image);
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

    watch(isUpdateSuccess, (isSuccess) => {
      if (isSuccess) {
        toast.success('Producto actualizado correctamente');
        resetForm({ values: updateProduct.value });
        imageFiles.value = [];
        router.replace(`/admin/products/${updateProduct.value!.id}`);
      }
    });

    watch(
      () => props.productId,
      () => {
        console.log('productId changed: ', props.productId);
        refetch();
      },
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
      imageFiles,

      isPending,

      // getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

      // actions
      onSubmit,
      toggleSize,
      hasSize,
      onFileChanged,
      temporalImageURI,
    };
  },
});
