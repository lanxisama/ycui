<template>
	<div>
		<el-table :data="tableData" :stripe="stripe" :border='border' :size='size' :maxHeight='maxHeight' :fit='fit' :showHeader='showHeader' :rowClassName='rowClassName'>
			<template v-if="tableData.length>0">
				<template v-for="(item,key) in tableData[0]">
					<el-table-column :prop="key" :label="key" :key='key' :height='height' :width='width'>
					</el-table-column>
					<el-button>这是个具名插槽</el-button>
				</template>
			</template>

		</el-table>
	</div>
</template>

<script>
	// import Extends from './extends'
	export default {
		name: "MTable",
		components: {
			// Extends
		},
		props: {
			tableData: {
				type: Array,
				default: function() {
					return [];
				}
			},
			stripe: {
				type: Boolean,
				default: false
			},
			fixed: {
				type: [String, Boolean],
				validator(val) {
					if (typeof val === 'string') {
						return ['true', 'left', 'right'].includes(val)
					}
				}
			},
			border: {
				type: Boolean,
				default: false
			},
			size: {
				type: String,
				validator(val) {
					return ['medium', 'small', 'mini'].includes(val)
				}
			},
			height: [String, Number],
			width: [String, Number],
			maxHeight: [String, Number],
			fit: {
				type: Boolean,
				default: true
			},
			showHeader: {
				type: Boolean,
				default: true
			},
			rowClassName: [String, Function],
		},
		methods: {

		},
		created() {}
	}
</script>
