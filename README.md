# Learn NextJS - Notes

## Section 6: Work List Page

- Render work list via Pagination / Infinity Scroll
- Search by title
- Filter by category

### `06-09` Show hide menu based on login status

1. Config route list to specify which menu requires login
2. Render route list based on login status
3. Integrate with login and test

### `06-10` add type definition for useAuth

- Target to have type suggestion when using profile from useAuth()
- TIP: Organize Imports (Option + Shift + O)

### `06-11` save logged in user info

**Current flow:**
1. On init: useAuth with default data = `undefined`
2. Call API profile and update data = logged in user

**Updated flow:**
1. Save user's info to local storage if login successfully
2. On init: useAuth with default data = `user info from local storage`
3. Call API profile and update data = logged in user
4. Remove local storage if logout

key: `user_info`

Unexpected cases handling:
- What if fetch profile failed?

### `06-12` Text content did not match. Server: "Blog" Client: "Works"

Process:
1. Server side generate HTML (A) and send to client
2. Client get HTML (A) to display on UI and download JS in the background
3. Once JS downloaded, it will be executed. Hydration process take place and generate a new DOM (B). Then it try to match B and A and attach event listener to it.

If A = B --> OK
If A <> B --> Show error text content did not match

Solutions:
- Make sure the first render on client side should be the same with server side.
- Use client side rendering via dynamic feature of NextJS (not SEO friendly)


Refs:
- [https://nextjs.org/docs/messages/react-hydration-error](https://nextjs.org/docs/messages/react-hydration-error)
- [https://www.joshwcomeau.com/react/the-perils-of-rehydration/](https://www.joshwcomeau.com/react/the-perils-of-rehydration/)
- [https://blog.saeloun.com/2021/12/16/hydration](https://blog.saeloun.com/2021/12/16/hydration)
- [https://thanhle.blog/blog/server-side-rendering-voi-hydration-lang-phi-tai-nguyen-nhu-the-nao](https://thanhle.blog/blog/server-side-rendering-voi-hydration-lang-phi-tai-nguyen-nhu-the-nao)
- [https://nextjs.org/docs/advanced-features/dynamic-import](https://nextjs.org/docs/advanced-features/dynamic-import)


### `06-13` fix issues from video of 06-10 + 06-12

- Can't change tsconfig from `jsx: preserve` to `jsx: react`
- Can safely remove React import due to [this post](https://nextjs.org/docs/upgrading#react-16-to-17)
- Can't use named export with ssr: false --> change to use default import instead


Refs:
- [https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

### `06-14` show login error

- Mock response to return Error instead of success
- How to extract error body from API response
  - Throw error response in axios interceptor
  - Retrieve error message in catch statement
  - Do whatever you want with the message (show toast, log, report error, ...)
  - add react-toastify package
  - toast error message

Ref: [https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript)

### `06-15` work list api

- Works API
- [OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi)
- Where to get API Schema file? --> from [my github repo](https://github.com/paulnguyen-mn/learn-nextjs)
- Demo how to use Swagger directly in VSCode

### `06-16` setup work api

- add work-api.ts
- add type definition for work api: ListResponse<T>, ListParams
- call API and log data on component

```ts
export interface Pagination {
	_page: number
	_limit: number
	_totalRows: number
}
```

### `06-17` setup useWorkList hook

- update Pagination type: `_total` to `_totalRows`
- update `swr` lib to latest v2.1.2
- implement useWorkList() hook using useSWR()
- try to use the hook in component

### `06-18` Work List UI

- Show Work List UI
- demo decouple interval
- List State
  - Loading
  - No data
  - Has data

### `06-19` Work List UI - Add loading skeleton

- Component: `<Skeleton />` [docs](https://mui.com/material-ui/react-skeleton/)
- Update `<WorkList />` to show loading status

### `06-20` Work List UI - Pagination

- Using Component `<Pagination />` [docs](https://mui.com/material-ui/react-pagination/#controlled-pagination)
- Integrate our API response with Pagination component
- Disable Prev / Next when page is at min / max.

```tsx
export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
}
```

### `06-21` Work List UI - Search

- Add `<WorkFilters />` component (clone from `<LoginForm />`)
  - take care of all filters: search, categories select, ...
  - take initial value to set default value for each filter
- Support `externalOnChange` for `<InputField />`
- Add debounce on search change
- Log form submission value
- Log data received at page-level component

PageA: control form submit logic
|__ WorkFilters: manage filters form and notify parent via callback if any changes
|  |__ InputField: search
|  |__ SelectField: category select

PageB: control form submit logic
|__ WorkFilters: manage filters form and notify parent via callback if any changes
|  |__ InputField: search
|  |__ SelectField: category select

### `06-22` Work List UI - Sync filters to URL

**Current flow**: refetch work list whenever filters `state` changes
**Current flow**: when filters change --> update `state` (setFilters)

**New flow**: refetch work list whenever `router query` changes
**New flow**: when filters change --> update `router query`

- remove filters state
- using [Shallow Routing](https://nextjs.org/docs/routing/shallow-routing)
- how to set default values for `WorkFilters`
- how to ignore the first render with empty query?
- fixed: API resolved without sending a response for /api/works?_page=1&_limit=3, this may result in stalled requests.

### `06-23` Work List UI - Performance Insights

- Goal: will `show page loading` by default (both on server and client)
- Using tool: Performance Insights

Process:
1. Server return a HTML `A`
2. Client render first time `B` - router.`isReady = false`, router.query = undefined
3. Client render second time - router.`isReady = true`, router.query = data

```tsx
<Skeleton
  variant="rectangular"
  height={40}
  sx={{
    display: 'inline-block',
    width: '100%',
    mt: 2,
    mb: 1,
    verticalAlign: 'middle', // fix layout shift
  }}
/>
```

### `06-24` - AutocompleteField P1

A Form Control includes 2 main parts:
- UI control
- Bind form state to UI control (react-hook-form)
--> integrate with form logic

------------

- Add Autocomplete UI control
- Show it on UI to see how it looks like
- Add new component: `AutocompleteField` (cloned from `InputField`)

### `06-25` - AutocompleteField P2

- Add type definition for AutocompleteField
- Add new key to WorkFiltersPayload: tagList_like
- Add generic type for InputField
- Add generic type for AutocompleteField

### `06-26` - AutocompleteField P3

- Integrate with react hook form control
- Binding form state: onChange, onBlur, ref, value, error

### `06-27` - Populate data tag list to AutocompleteField

- add new api file: api-client/tag-api.ts
  GET: /api/tags?_page=1&_limit=30

- new hook file: hooks/use-tag-list.ts
- Populate data to AutocompleteField

### `06-28` - Filter work list by multiple tags selection

- filter works by tags (either tag1 or tag2 or tag3): 
  GET /api/works?_page=1&_limit=10&`tagList_like=tag1|tag2|tag3`
- transform form data into api payload

```ts
const formData = { search: '', selectedTagList: ['Design', 'Dashboard'] }

// 1. turn selectedTagList into tagList_like (array to string using join())
// 2. remove unused attr selectedTagList
const apiPayload = { search: '', tagList_like: 'Design|Dashboard' }
```
- set initial value for auto complete field 


### `06-29` - Infinity scroll - useWorkListInfinity() hook

- Demo idea via behance.net
- Clone works/index.tsx page into works/infinity-scroll.tsx
- Remove pagination approach / change to new hook
- Implement new hook useWorkListInfinity() using useSWRInfinite() from SWR
- Add new lib: qs to parse query

Approach:
- Clone page
- Change data source by new hook
- Convert new data to workList
- Pass worklist to <WorkList />
- Handle load more

### `06-30` - Infinity scroll - binding work list data

- handle `enabled` params in the hook
- Convert new data to workList
- Pass worklist to <WorkList />
- Add simple load more

### `06-31` - Infinity scroll - auto load more

- `yarn add react-intersection-observer`

```tsx
import React from 'react';
import { useInView } from 'react-intersection-observer';

const Component = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div ref={ref}>
      <h2>{`Header inside viewport ${inView}.`}</h2>
    </div>
  );
};
```

## Section 7: Add Edit Work Form

- Setup Page / Form
- Rich Text Editor control
- Form Validation

### `07-01` - Intro and setup page

- Setup works/[workId].tsx - AddEditWorkPage
- Detect Add or Edit mode

### `07-02` - Call details API if edit mode

- Add new hook: hooks/use-work-details.ts
- Integrate the new hook into AddEditWorkPage, make sure it only calls in edit mode

### `07-03` - Setup WorkForm

- Add new form: components/work/work-form.tsx
- Show form on Page
- Add title control: <InputField />
- Add shortDescription control: <InputField multiline/>

### `07-04` - WorkForm - tagList

- Add tagList control: <AutocompleteField />
- Validation array of string

### `07-05` - WorkForm - Setup PhotoField

- New form control: `<PhotoField />`
  - UI: preview image + upload file (hidden) + error message
  - Data: `{ file: File, previewUrl: string }`
  - Logic:
    - init show previewUrl || default placeholder
    - onChange: update data
- Setup PhotoField and handle onChange

### `07-06` - WorkForm - Validate thumbnail control

- Custom validation logic via yup.test()
- 1MB = 1024 * 1024 Bytes (MB -1024-> KB -1024-> BYTES)
- Limit upload file less than 3MB
- Conditional validation, required when add, optional when edit

