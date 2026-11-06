/**
 * Every `[data-form]`:
 * - `data-demo` (set while the form has no endpoint): validates, then swaps in
 *   `[data-form-success]` instead of sending.
 * - `[data-step]` fieldsets become a stepper; `[data-next]` / `[data-prev]` move
 *   between them, and `[data-summary]` lists the answers before sending.
 * - `[data-file]` labels show the chosen file's name.
 */
const fieldsIn = (root: Element) =>
  [
    ...root.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      "input, select, textarea",
    ),
  ].filter((field) => !field.disabled && field.type !== "hidden");

const firstInvalid = (root: Element) => fieldsIn(root).find((field) => !field.checkValidity());

const labelFor = (field: HTMLElement) => {
  const form = field.closest("form");
  const legend = field.closest("fieldset[data-group]")?.querySelector("legend")?.textContent;
  if (legend) return legend.trim();
  const label = field.id ? form?.querySelector(`label[for="${field.id}"]`) : null;
  return (label?.textContent ?? field.getAttribute("name") ?? "")
    .replace(/\s*\(optional\)\s*/i, "")
    .trim();
};

function summarise(form: HTMLFormElement, target: HTMLElement) {
  const rows = new Map<string, string[]>();
  fieldsIn(form).forEach((field) => {
    if (field.closest("[data-summary-skip]")) return;
    let value = "";
    if (
      field instanceof HTMLInputElement &&
      (field.type === "checkbox" || field.type === "radio")
    ) {
      if (!field.checked) return;
      value = field.closest("label")?.textContent?.trim() ?? field.value;
    } else if (field instanceof HTMLInputElement && field.type === "file") {
      value = field.files?.[0]?.name ?? "";
    } else if (field instanceof HTMLSelectElement) {
      value = field.selectedOptions[0]?.value ? field.selectedOptions[0].text : "";
    } else {
      value = field.value.trim();
    }
    if (!value) return;
    const key = labelFor(field);
    rows.set(key, [...(rows.get(key) ?? []), value]);
  });
  target.replaceChildren(
    ...[...rows].map(([key, values]) => {
      const row = document.createElement("div");
      row.className = "summary-row";
      const dt = document.createElement("dt");
      dt.textContent = key;
      const dd = document.createElement("dd");
      dd.textContent = values.join(", ");
      row.append(dt, dd);
      return row;
    }),
  );
}

function initSteps(form: HTMLFormElement) {
  const steps = [...form.querySelectorAll<HTMLElement>("[data-step]")];
  if (!steps.length) return;
  const markers = [...form.querySelectorAll<HTMLElement>("[data-step-marker]")];
  const status = form.querySelector<HTMLElement>("[data-step-status]");
  let index = 0;

  const show = (next: number, focus = true) => {
    index = Math.max(0, Math.min(next, steps.length - 1));
    steps.forEach((step, i) => {
      step.hidden = i !== index;
    });
    markers.forEach((marker, i) => {
      marker.toggleAttribute("data-done", i < index);
      marker.toggleAttribute("data-current", i === index);
      if (i === index) marker.setAttribute("aria-current", "step");
      else marker.removeAttribute("aria-current");
    });
    if (status) status.textContent = `Step ${index + 1} of ${steps.length}`;
    form
      .querySelectorAll<HTMLElement>("[data-prev]")
      .forEach((button) => (button.style.visibility = index === 0 ? "hidden" : ""));
    form
      .querySelectorAll<HTMLElement>("[data-next]")
      .forEach((button) => (button.hidden = index === steps.length - 1));
    const summary = steps[index].querySelector<HTMLElement>("[data-summary]");
    if (summary) summarise(form, summary);
    if (focus) {
      const heading = steps[index].querySelector<HTMLElement>("legend, h2, h3");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
      form.scrollIntoView({
        block: "start",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  };

  form.addEventListener("click", (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>("[data-next], [data-prev]");
    if (!button) return;
    event.preventDefault();
    if (button.hasAttribute("data-prev")) return show(index - 1);
    const invalid = firstInvalid(steps[index]);
    if (invalid) {
      form.classList.add("was-validated");
      invalid.reportValidity();
      return;
    }
    show(index + 1);
  });

  form.addEventListener("form:reset", () => show(0));
  form.classList.add("is-stepped");
  show(0, false);
}

function initFiles(form: HTMLFormElement) {
  form.querySelectorAll<HTMLInputElement>("[data-file] input[type=file]").forEach((input) => {
    const name = input.closest("[data-file]")?.querySelector<HTMLElement>("[data-file-name]");
    const fallback = name?.textContent ?? "";
    input.addEventListener("change", () => {
      if (name) name.textContent = input.files?.[0]?.name ?? fallback;
      input.closest("[data-file]")?.toggleAttribute("data-has-file", Boolean(input.files?.length));
    });
  });
}

document.querySelectorAll<HTMLFormElement>("form[data-form]").forEach((form) => {
  initSteps(form);
  initFiles(form);

  form.addEventListener("submit", (event) => {
    const invalid = firstInvalid(form);
    if (invalid) {
      event.preventDefault();
      form.classList.add("was-validated");
      const step = invalid.closest<HTMLElement>("[data-step]");
      if (step?.hidden) step.hidden = false;
      invalid.reportValidity();
      return;
    }
    if (!form.hasAttribute("data-demo")) return;
    event.preventDefault();
    const success = form.querySelector<HTMLElement>("[data-form-success]");
    const body = form.querySelector<HTMLElement>("[data-form-body]");
    if (!success) return;
    if (body) body.hidden = true;
    success.hidden = false;
    success.setAttribute("tabindex", "-1");
    success.focus();
  });

  form.querySelector("[data-form-reset]")?.addEventListener("click", () => {
    form.reset();
    form.classList.remove("was-validated");
    form
      .querySelectorAll<HTMLElement>("[data-file-name]")
      .forEach((name) => (name.textContent = name.dataset.default ?? ""));
    form
      .querySelectorAll("[data-has-file]")
      .forEach((field) => field.removeAttribute("data-has-file"));
    const success = form.querySelector<HTMLElement>("[data-form-success]");
    const body = form.querySelector<HTMLElement>("[data-form-body]");
    if (success) success.hidden = true;
    if (body) body.hidden = false;
    form.dispatchEvent(new Event("form:reset"));
  });
});
