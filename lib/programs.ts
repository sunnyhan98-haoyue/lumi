export type Program = {
  id: string;
  school: string;
  program: string;
  programShort: string;
  round: string;
  deadline: Date;
  gmatGre: "required" | "optional" | "not_required";
  recLetters: number;
  essays: number;
  video: boolean;
  notes?: string;
};

function parseDeadlineUS(mdy: string): Date {
  const [m, d, y] = mdy.split("/").map((s) => s.trim());
  const month = String(m).padStart(2, "0");
  const day = String(d).padStart(2, "0");
  return new Date(`${y}-${month}-${day}`);
}

function notesField(notes: string): { notes: string } | Record<string, never> {
  const t = notes.trim();
  return t ? { notes: t } : {};
}

/** Tab-separated source baked into helpers for clarity */
export const PROGRAMS: Program[] = [
  {
    id: "hec-yale-m2m-r1",
    school: "HEC Paris × Yale SOM",
    program:
      "MSc International Finance / MAM Dual Degree",
    programShort: "HEC × Yale M2M",
    round: "R1",
    deadline: parseDeadlineUS("10/2/2026"),
    gmatGre: "required",
    recLetters: 2,
    essays: 5,
    video: true,
  },
  {
    id: "hec-yale-m2m-r2",
    school: "HEC Paris × Yale SOM",
    program:
      "MSc International Finance / MAM Dual Degree",
    programShort: "HEC × Yale M2M",
    round: "R2",
    deadline: parseDeadlineUS("12/16/2026"),
    gmatGre: "required",
    recLetters: 2,
    essays: 5,
    video: true,
  },
  {
    id: "hec-yale-m2m-r3",
    school: "HEC Paris × Yale SOM",
    program:
      "MSc International Finance / MAM Dual Degree",
    programShort: "HEC × Yale M2M",
    round: "R3",
    deadline: parseDeadlineUS("2/19/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 5,
    video: true,
  },
  {
    id: "hec-yale-m2m-r4",
    school: "HEC Paris × Yale SOM",
    program:
      "MSc International Finance / MAM Dual Degree",
    programShort: "HEC × Yale M2M",
    round: "R4",
    deadline: parseDeadlineUS("4/9/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 5,
    video: true,
  },
  {
    id: "hkust-yale-m2m-r1",
    school: "HKUST × Yale SOM",
    program:
      "MSc Global Operations / MAM Dual Degree",
    programShort: "HKUST × Yale M2M",
    round: "R1",
    deadline: parseDeadlineUS("8/15/2026"),
    gmatGre: "required",
    recLetters: 2,
    essays: 1,
    video: false,
    ...notesField(
      "Yale 第二阶段:HKUST 通过后追加 3 篇 essay+video",
    ),
  },
  {
    id: "hkust-yale-m2m-r2",
    school: "HKUST × Yale SOM",
    program:
      "MSc Global Operations / MAM Dual Degree",
    programShort: "HKUST × Yale M2M",
    round: "R2",
    deadline: parseDeadlineUS("10/12/2026"),
    gmatGre: "required",
    recLetters: 2,
    essays: 1,
    video: false,
    ...notesField(
      "Yale 第二阶段:HKUST 通过后追加 3 篇 essay+video",
    ),
  },
  {
    id: "hkust-yale-m2m-r3",
    school: "HKUST × Yale SOM",
    program:
      "MSc Global Operations / MAM Dual Degree",
    programShort: "HKUST × Yale M2M",
    round: "R3",
    deadline: parseDeadlineUS("11/30/2026"),
    gmatGre: "required",
    recLetters: 2,
    essays: 1,
    video: false,
    ...notesField(
      "Yale 第二阶段:HKUST 通过后追加 3 篇 essay+video",
    ),
  },
  {
    id: "hkust-yale-m2m-r4",
    school: "HKUST × Yale SOM",
    program:
      "MSc Global Operations / MAM Dual Degree",
    programShort: "HKUST × Yale M2M",
    round: "R4",
    deadline: parseDeadlineUS("1/11/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 1,
    video: false,
    ...notesField(
      "Yale 第二阶段:HKUST 通过后追加 3 篇 essay+video",
    ),
  },
  {
    id: "hkust-yale-m2m-r5",
    school: "HKUST × Yale SOM",
    program:
      "MSc Global Operations / MAM Dual Degree",
    programShort: "HKUST × Yale M2M",
    round: "R5",
    deadline: parseDeadlineUS("3/1/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 1,
    video: false,
    ...notesField(
      "Yale 第二阶段:HKUST 通过后追加 3 篇 essay+video",
    ),
  },
  {
    id: "cornell-aem-r1",
    school: "Cornell University",
    program: "Applied Economics & Management (MPS)",
    programShort: "Cornell AEM",
    round: "R1",
    deadline: parseDeadlineUS("12/1/2026"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
  },
  {
    id: "cornell-aem-r2",
    school: "Cornell University",
    program: "Applied Economics & Management (MPS)",
    programShort: "Cornell AEM",
    round: "R2",
    deadline: parseDeadlineUS("1/15/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
  },
  {
    id: "cornell-aem-r3",
    school: "Cornell University",
    program: "Applied Economics & Management (MPS)",
    programShort: "Cornell AEM",
    round: "R3",
    deadline: parseDeadlineUS("3/1/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
  },
  {
    id: "cornell-aem-r4",
    school: "Cornell University",
    program: "Applied Economics & Management (MPS)",
    programShort: "Cornell AEM",
    round: "R4",
    deadline: parseDeadlineUS("4/15/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
  },
  {
    id: "northwestern-mim-r1",
    school: "Northwestern Kellogg",
    program: "Master in Management Studies",
    programShort: "Kellogg MiM",
    round: "R1",
    deadline: parseDeadlineUS("10/29/2026"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
    ...notesField(
      "GMAT/GRE waiver: Northwestern undergrads or GPA 3.4+",
    ),
  },
  {
    id: "northwestern-mim-r2",
    school: "Northwestern Kellogg",
    program: "Master in Management Studies",
    programShort: "Kellogg MiM",
    round: "R2",
    deadline: parseDeadlineUS("1/14/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
    ...notesField(
      "GMAT/GRE waiver: Northwestern undergrads or GPA 3.4+",
    ),
  },
  {
    id: "northwestern-mim-r3",
    school: "Northwestern Kellogg",
    program: "Master in Management Studies",
    programShort: "Kellogg MiM",
    round: "R3",
    deadline: parseDeadlineUS("4/15/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
    ...notesField("R3/R4 仅限国内申请者"),
  },
  {
    id: "northwestern-mim-r4",
    school: "Northwestern Kellogg",
    program: "Master in Management Studies",
    programShort: "Kellogg MiM",
    round: "R4",
    deadline: parseDeadlineUS("5/27/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
    ...notesField("R3/R4 仅限国内申请者"),
  },
  {
    id: "chicago-mim-r1",
    school: "Chicago Booth",
    program: "Master in Management",
    programShort: "Booth MiM",
    round: "R1",
    deadline: parseDeadlineUS("10/9/2026"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
  },
  {
    id: "chicago-mim-r2",
    school: "Chicago Booth",
    program: "Master in Management",
    programShort: "Booth MiM",
    round: "R2",
    deadline: parseDeadlineUS("1/8/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
  },
  {
    id: "chicago-mim-r3",
    school: "Chicago Booth",
    program: "Master in Management",
    programShort: "Booth MiM",
    round: "R3",
    deadline: parseDeadlineUS("3/5/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
  },
  {
    id: "chicago-mim-r4",
    school: "Chicago Booth",
    program: "Master in Management",
    programShort: "Booth MiM",
    round: "R4",
    deadline: parseDeadlineUS("4/30/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
  },
  {
    id: "chicago-mim-r5",
    school: "Chicago Booth",
    program: "Master in Management",
    programShort: "Booth MiM",
    round: "R5",
    deadline: parseDeadlineUS("5/29/2027"),
    gmatGre: "required",
    recLetters: 2,
    essays: 2,
    video: true,
  },
];
