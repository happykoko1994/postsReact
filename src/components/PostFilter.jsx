import MySelect from './UI/select/MySelect'
import MyInput from './UI/input/MyInput';
import { useSearchParams } from 'react-router-dom';

function PostFilter({ filter, setFilter }) {

    const [searchParams, setSearchParams] = useSearchParams("")
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => {

                    setSearchParams({ search: e.target.value })

                    setFilter({ ...filter, query: e.target.value })
                }
                }
                placeholder='Поиск'
            />

            <MySelect
                value={filter.sort}
                onChange={(selectedSort, e) => {

                    setFilter({ ...filter, sort: selectedSort })
                }
                }
                defaultValue='Сортировка'
                options={[
                    { value: 'title', name: 'По названию' },
                    { value: 'body', name: 'По  описанию' },

                ]}

            />
        </div>)
}
export default PostFilter