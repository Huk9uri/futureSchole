# FutureSchole Enrollment

다단계 수강 신청 폼 과제 구현 프로젝트입니다. 강의 선택, 신청 유형 선택, 수강생 정보 입력, 확인 및 제출까지의 흐름을 React 기반 SPA로 구성했습니다.

## 프로젝트 개요

온라인 교육 플랫폼에서 사용자가 원하는 강의를 선택하고 개인 또는 단체 신청 정보를 입력한 뒤 최종 확인 후 제출하는 수강 신청 폼입니다.

구현한 주요 흐름은 다음과 같습니다.

- 강의 목록 조회 및 카테고리 필터링
- 신청 가능한 강의만 보기 필터
- 강의 정원 상태 표시
- 개인 신청 / 단체 신청 유형 선택
- 신청 유형별 입력 폼 렌더링
- 단계별 유효성 검증
- 확인 화면에서 신청 정보 수정
- Mock API 기반 제출 성공/실패 처리
- 수강 신청 완료 모달
- localStorage 기반 임시 저장
- 브라우저 새로고침/닫기 이탈 방지

## 기술 스택

- React
- TypeScript
- Vite
- TailwindCSS
- TanStack Query
- React Hook Form
- Zod
- Axios
- Day.js
- clsx

라이브러리 선택 이유:

- `React Hook Form`: 단계별 입력 폼 상태를 하나의 form state로 관리하기 위해 사용했습니다.
- `Zod`: UI와 분리된 스키마 기반 유효성 검증을 구성하기 위해 사용했습니다.
- `TanStack Query`: 강의 조회와 수강 신청 제출 API 호출 상태를 일관되게 관리하기 위해 사용했습니다.
- `TailwindCSS`: 과제 범위 안에서 빠르게 반응형 UI를 구성하기 위해 사용했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버 실행 후 브라우저에서 아래 주소로 접속합니다.

```txt
http://127.0.0.1:5173
```

빌드 확인:

```bash
npm run build
```

린트 확인:

```bash
npm run lint
```

## 프로젝트 구조 설명

```txt
src/
 ├── api/                 # Mock API 함수
 ├── components/
 │   ├── common/          # 공통 UI 컴포넌트
 │   └── enrollment/      # 수강 신청 도메인 컴포넌트
 ├── hooks/
 │   ├── queries/         # TanStack Query 조회 훅
 │   └── mutations/       # TanStack Query mutation 훅
 ├── mocks/               # Mock 데이터
 ├── pages/               # 페이지 단위 컴포넌트
 ├── schemas/             # Zod 유효성 검증 스키마
 ├── types/               # 도메인 타입 정의
 └── utils/               # 포맷, 변환, 에러, 임시 저장 유틸
```

주요 파일:

- `src/pages/EnrollmentPage.tsx`: 전체 수강 신청 흐름 제어
- `src/components/enrollment/CourseSelectStep.tsx`: 강의 선택 단계
- `src/components/enrollment/StudentInfoStep.tsx`: 신청 정보 입력 단계
- `src/components/enrollment/ConfirmStep.tsx`: 확인 및 제출 단계
- `src/schemas/enrollmentSchema.ts`: 수강 신청 유효성 검증
- `src/api/courses.ts`: 강의 목록 조회 Mock API
- `src/api/enrollments.ts`: 수강 신청 제출 Mock API
- `src/utils/enrollmentDraft.ts`: localStorage 임시 저장

## Mock API 구성

별도 백엔드 서버 없이 프론트엔드 내부 Mock API 함수로 API 환경을 구성했습니다.

- 강의 데이터는 `src/mocks/courses.ts`에서 관리합니다.
- 강의 목록 조회는 `src/api/courses.ts`의 `getCourses`에서 처리합니다.
- 수강 신청 제출은 `src/api/enrollments.ts`의 `createEnrollment`에서 처리합니다.
- `delay` 유틸을 사용해 실제 네트워크 요청과 유사한 응답 지연을 적용했습니다.
- TanStack Query의 query/mutation 훅을 통해 실제 API 호출과 유사한 사용 흐름을 유지했습니다.

지원하는 Mock API 동작:

- `GET /api/courses?category={category}`에 해당하는 강의 목록 필터링
- `POST /api/enrollments`에 해당하는 수강 신청 제출
- 정원 마감 시 `COURSE_FULL` 에러
- 같은 강의에 같은 이메일로 다시 신청 시 `DUPLICATE_ENROLLMENT` 에러
- 잘못된 요청 데이터 제출 시 `INVALID_INPUT` 에러
- 테스트용 알 수 없는 오류 케이스 `UNKNOWN_ERROR`

## 요구사항 해석 및 가정

- 수강 신청은 3단계로 구성했습니다.
  - 1단계: 강의 선택
  - 2단계: 수강생 정보 입력
  - 3단계: 확인 및 제출
- 강의 선택 후 개인/단체 신청 유형을 모달에서 먼저 선택하도록 구성했습니다.
- 강의 카드 전체가 아닌 `신청하기` 버튼을 눌렀을 때 신청 유형 선택 모달이 열리도록 구성했습니다.
  - 별도의 상세 정보 명세가 있었다면 강의 카드 클릭 시 상세 정보를 담은 모달을 제공하는 방식으로 확장하려 했습니다.
- 임시 저장은 현재 작성 중인 신청서 1건을 기준으로 관리했습니다.
  - 다른 강의 신청을 시작하면 기존 draft는 새 신청 정보로 대체됩니다.
  - 강의별 복수 draft 관리는 명세에 포함되어 있지 않아 구현하지 않았습니다.
- 이름 입력은 한국어 기반 신청 흐름을 기준으로 한글만 허용했습니다.
  - 영문 이름 허용 시 공백 처리 기준이 모호해지고, 참가자 명단 확인 목적상 영문 이름이 필수는 아니라고 판단했습니다.

## 설계 결정과 이유

### 폼 상태 관리

React Hook Form의 `FormProvider`로 전체 단계의 입력 상태를 공유했습니다.

- 각 단계에서 독립적인 `useState`를 두지 않고 하나의 form state로 관리했습니다.
- 이전 단계로 돌아가도 입력값이 유지됩니다.
- 제출 시 `EnrollmentFormValues`를 API 요청 타입으로 변환합니다.

### 타입 설계

개인 신청과 단체 신청 요청 타입을 분리하고, 최종 제출 데이터는 union 타입으로 정의했습니다.

```ts
export type EnrollmentFormData =
  | PersonalEnrollmentRequest
  | GroupEnrollmentRequest
```

이를 통해 신청 유형에 따라 UI와 제출 payload를 명확히 분기할 수 있도록 했습니다.

### 유효성 검증

Zod 스키마를 UI 컴포넌트와 분리해 관리했습니다.

주요 검증 조건:

- 이름: 한글만 허용, 2~20자
- 이메일: 필수, 이메일 형식
- 전화번호: 한국 전화번호 형식
- 수강 동기: 선택, 최대 300자
- 단체명: 단체 신청 시 필수
- 신청 인원 수: 단체 신청 시 2~10명
- 참가자 명단: 신청 인원 수만큼 이름/이메일 입력
- 참가자 이메일 중복 방지

### 단계 간 데이터 흐름

`EnrollmentPage`가 현재 단계, 선택 강의, 신청 유형을 제어합니다. 하위 컴포넌트는 필요한 값과 이벤트 핸들러를 props로 받아 화면 렌더링과 입력 처리에 집중하도록 분리했습니다.

### 강의 선택 UX

강의 목록에서는 카테고리 필터와 신청 가능 필터를 함께 제공합니다.

- 카테고리 필터는 API 조회 조건으로 사용합니다.
- 신청 가능 필터는 정원이 마감된 강의를 화면에서 제외합니다.
- 필터 결과가 없을 때는 빈 상태 안내를 표시합니다.
- 신청 유형 선택 모달은 카드 전체 클릭이 아니라 `신청하기` 버튼 클릭 시에만 열리도록 했습니다.

### 제출 에러 처리

Mock API에서 `ErrorResponse` 형태로 에러를 던지고, UI에서는 `getApiErrorResponse`, `getEnrollmentErrorMessage`, `getEnrollmentErrorDetails` 유틸로 화면 표시용 메시지로 변환합니다.

이렇게 분리한 이유는 `ConfirmStep`이 에러 메시지 변환 로직을 직접 담당하지 않고 제출 흐름과 UI 조합에 집중하도록 하기 위해서입니다.

## 미구현 / 제약사항

- MSW나 별도 로컬 서버는 사용하지 않았습니다.
  - 과제에서 Mock API 구성 방식은 자유라고 명시되어 있어 프론트엔드 내부 Mock API 함수 방식으로 구현했습니다.
- 강의별 복수 draft 저장은 구현하지 않았습니다.
  - 현재는 작성 중인 신청서 1건만 localStorage에 저장합니다.


## AI 활용 범위

AI는 구현 방향 정리, 코드 구조 설계, 커밋 단위 분리, README 초안 작성 보조에 활용했습니다.

최종 코드와 요구사항 반영 여부는 직접 검토하고 수정했습니다. 특히 유효성 검증 조건, 신청 유형 분기, Mock API 에러 처리, 임시 저장 및 이탈 방지 정책은 과제 명세를 기준으로 확인했습니다.

## 제출 전 확인

```bash
npm run lint
npm run build
```

위 두 명령이 통과하는 것을 기준으로 제출 상태를 확인합니다.
