function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10 sm:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Future School Enrollment
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            다단계 수강 신청 폼
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            강의 선택, 신청 정보 입력, 확인 및 제출까지 이어지는 수강 신청
            흐름을 단계별로 구현합니다.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                프로젝트 기본 세팅 완료
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Vite, React, TypeScript, TailwindCSS, TanStack Query 기반이
                준비되었습니다.
              </p>
            </div>
            <span className="inline-flex w-fit rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
              Step 1
            </span>
          </div>

          <ol className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <li className="rounded-md border border-slate-200 p-4">
              1. 강의 선택
            </li>
            <li className="rounded-md border border-slate-200 p-4">
              2. 정보 입력
            </li>
            <li className="rounded-md border border-slate-200 p-4">
              3. 확인 및 제출
            </li>
          </ol>
        </div>
      </section>
    </main>
  )
}

export default App
